const express = require('express');
const { hitungRingkasan, cariTransaksi } = require('./keuanganHelper');

const app = express();
const port = 3000;

app.use(express.json());

// penyimpanan data transaksi array of objects
let transaksi = [
  {
    id: 1,
    nama: 'Kiriman Bulanan Orang Tua',
    kategori: 'Uang Saku',
    jenis: 'pemasukan',
    nominal: 1500000,
    tanggal: '2026-11-01'
  },
  {
    id: 2,
    nama: 'Makan Siang Warteg',
    kategori: 'Konsumsi',
    jenis: 'pengeluaran',
    nominal: 18000,
    tanggal: '2026-11-02'
  },
  {
    id: 3,
    nama: 'Print Laporan Praktikum',
    kategori: 'Kuliah',
    jenis: 'pengeluaran',
    nominal: 15000,
    tanggal: '2026-11-03'
  },
  {
    id: 4,
    nama: 'Beli Paket Data Internet',
    kategori: 'Internet',
    jenis: 'pengeluaran',
    nominal: 55000,
    tanggal: '2026-11-05'
  }
];

// 1. route utama
app.get('/', (req, res) => {
  res.json({
    aplikasi: 'API Pencatatan Pengeluaran Mahasiswa',
    status: 'Server Aktif',
    daftar_endpoint: [
      'GET /anggota',
      'GET /transaksi',
      'GET /transaksi/cari/:keyword',
      'GET /transaksi/:id',
      'POST /transaksi',
      'PUT /transaksi/:id',
      'DELETE /transaksi/:id',
      'GET /ringkasan'
    ]
  });
});

// 2. menampilkan data anggota kelompok
app.get('/anggota', (req, res) => {
  res.json({
    mata_kuliah: 'Pemrograman Berbasis Platform',
    kelas: 'TI25A',
    tema_aplikasi: 'Aplikasi Pencatatan Pengeluaran Mahasiswa',
    anggota: [
      { nama: 'Deska Wahyu Eka Putra', nim: '20250040030' },
      { nama: 'Anmas Prabuokto', nim: '20250040084' },
      { nama: 'Juwita', nim: '20250040146' },
      { nama: 'Muhamad Chikal Ziaulhaq', nim: '20250040072' }
    ]
  });
});

// 3. menampilkan semua data transaksi
app.get('/transaksi', (req, res) => {
  res.json({
    total_data: transaksi.length,
    data: transaksi
  });
});

// 4. mencari transaksi berdasarkan nama/kategori
app.get('/transaksi/cari/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const hasilCari = cariTransaksi(transaksi, keyword);

  if (hasilCari.length === 0) {
    return res.status(404).json({
      message: `Transaksi dengan kata kunci '${keyword}' tidak ditemukan`
    });
  }

  res.json({
    kata_kunci: keyword,
    jumlah_ditemukan: hasilCari.length,
    data: hasilCari
  });
});

// 5. menampilkan detail transaksi berdasarkan ID
app.get('/transaksi/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = transaksi.find((t) => t.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
  }

  res.json(item);
});

// 6. menambahkan transaksi baru
app.post('/transaksi', (req, res) => {
  const { nama, kategori, jenis, nominal, tanggal } = req.body;

  if (!nama || !kategori || !jenis || nominal === undefined) {
    return res.status(400).json({
      message: 'Input tidak lengkap. Wajib mengisi nama, kategori, jenis, dan nominal.'
    });
  }

  if (jenis !== 'pemasukan' && jenis !== 'pengeluaran') {
    return res.status(400).json({
      message: "Kolom jenis harus diisi 'pemasukan' atau 'pengeluaran'."
    });
  }

  if (isNaN(nominal) || Number(nominal) <= 0) {
    return res.status(400).json({
      message: 'Nominal harus berupa angka lebih dari 0.'
    });
  }

  const idBaru = transaksi.length > 0 ? transaksi[transaksi.length - 1].id + 1 : 1;

  const transaksiBaru = {
    id: idBaru,
    nama: nama,
    kategori: kategori,
    jenis: jenis,
    nominal: Number(nominal),
    tanggal: tanggal || new Date().toISOString().split('T')[0]
  };

  transaksi.push(transaksiBaru);

  res.status(201).json({
    message: 'Transaksi berhasil ditambahkan',
    data: transaksiBaru
  });
});

// 7. memperbarui data transaksi berdasarkan ID
app.put('/transaksi/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transaksi.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
  }

  const { nama, kategori, jenis, nominal, tanggal } = req.body;

  if (jenis && jenis !== 'pemasukan' && jenis !== 'pengeluaran') {
    return res.status(400).json({
      message: "Kolom jenis harus diisi 'pemasukan' atau 'pengeluaran'."
    });
  }

  if (nominal !== undefined && (isNaN(nominal) || Number(nominal) <= 0)) {
    return res.status(400).json({
      message: 'Nominal harus berupa angka lebih dari 0.'
    });
  }

  transaksi[index] = {
    id: transaksi[index].id,
    nama: nama || transaksi[index].nama,
    kategori: kategori || transaksi[index].kategori,
    jenis: jenis || transaksi[index].jenis,
    nominal: nominal !== undefined ? Number(nominal) : transaksi[index].nominal,
    tanggal: tanggal || transaksi[index].tanggal
  };

  res.json({
    message: `Transaksi ID ${id} berhasil diperbarui`,
    data: transaksi[index]
  });
});

// 8. menghapus data transaksi berdasarkan ID
app.delete('/transaksi/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transaksi.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
  }

  const dataTerhapus = transaksi.splice(index, 1);

  res.json({
    message: `Transaksi ID ${id} berhasil dihapus`,
    data_terhapus: dataTerhapus[0]
  });
});

// 9. menampilkan ringkasan keuangan contoh: total pemasukan, total pengeluaran, sisa saldo, status keuangan
app.get('/ringkasan', (req, res) => {
  const ringkasan = hitungRingkasan(transaksi);
  res.json(ringkasan);
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});