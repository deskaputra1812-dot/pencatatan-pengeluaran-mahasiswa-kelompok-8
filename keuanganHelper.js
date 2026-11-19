const hitungRingkasan = (daftarTransaksi) => {
  let totalPemasukan = 0;
  let totalPengeluaran = 0;

  for (let i = 0; i < daftarTransaksi.length; i++) {
    if (daftarTransaksi[i].jenis === 'pemasukan') {
      totalPemasukan += daftarTransaksi[i].nominal;
    } else if (daftarTransaksi[i].jenis === 'pengeluaran') {
      totalPengeluaran += daftarTransaksi[i].nominal;
    }
  }

  const sisaSaldo = totalPemasukan - totalPengeluaran;

  const statusKeuangan = sisaSaldo >= 0 ? 'Aman' : 'Defisit';

  return {
    jumlah_transaksi: daftarTransaksi.length,
    total_pemasukan: totalPemasukan,
    total_pengeluaran: totalPengeluaran,
    sisa_saldo: sisaSaldo,
    status_keuangan: statusKeuangan
  };
};

const cariTransaksi = (daftarTransaksi, keyword) => {
  const kataKunci = keyword.toLowerCase();
  const hasil = [];

  for (let i = 0; i < daftarTransaksi.length; i++) {
    const namaCocok = daftarTransaksi[i].nama.toLowerCase().includes(kataKunci);
    const kategoriCocok = daftarTransaksi[i].kategori.toLowerCase().includes(kataKunci);

    if (namaCocok || kategoriCocok) {
      hasil.push(daftarTransaksi[i]);
    }
  }

  return hasil;
};

module.exports = { hitungRingkasan, cariTransaksi };