Betul, di materi perkuliahan Sesi 1–7 istilah yang dipakai memang \*\*Web Server, Express.js, dan Routing\*\*—istilah "API" belum dibahas secara khusus sehingga lebih aman tidak dipakai supaya tidak membingungkan saat ditanya dosen nanti.



Berikut isi `README.md` yang sudah disesuaikan dengan istilah materi kuliah, tanpa embel-embel "API" dan tanpa bagan struktur folder:



```markdown

\# Aplikasi Pencatatan Pengeluaran Mahasiswa



Aplikasi pencatatan pengeluaran mahasiswa berbasis web yang dikembangkan menggunakan \*\*JavaScript\*\*, \*\*Node.js\*\*, dan framework \*\*Express.js\*\*. Aplikasi ini dirancang untuk membantu mahasiswa mencatat, mengelola, dan memantau pemasukan serta pengeluaran uang sehari-hari agar penggunaan uang lebih terencana.



\## Anggota Kelompok

\* \*\*Deska Wahyu Eka Putra\*\* (20250040030)

\* \*\*Anmas Prabuokto\*\* (20250040084)

\* \*\*Juwita\*\* (20250040146)

\* \*\*Muhamad Chikal Ziaulhaq\*\* (20250040072)



\*\*Mata Kuliah:\*\* Pemrograman Berbasis Platform (Project UTS)  

\*\*Kelas:\*\* TI25A — Universitas Nusa Putra



\## Fitur Aplikasi

\* Menampilkan informasi aplikasi dan daftar anggota kelompok.

\* Menampilkan seluruh daftar transaksi pemasukan dan pengeluaran.

\* Mencari data transaksi berdasarkan nama transaksi atau kategori.

\* Menampilkan detail transaksi berdasarkan ID.

\* Menambahkan data transaksi baru.

\* Memperbarui informasi transaksi yang sudah tersimpan.

\* Menghapus data transaksi yang sudah tidak diperlukan.

\* Menghitung total pemasukan, total pengeluaran, sisa saldo, serta status keuangan.



\## Konsep dan Teknologi yang Digunakan

\* \*\*Node.js \& Express.js:\*\* Membangun web server dan sistem routing (`GET`, `POST`, `PUT`, `DELETE`).

\* \*\*Array \& Object Literal:\*\* Menyimpan dan mengelola kumpulan data transaksi.

\* \*\*Modules \& Packages:\*\* Memisahkan fungsi perhitungan dan pencarian ke modul lokal (`keuanganHelper.js`) serta menggunakan package `express` dari NPM.

\* \*\*Percabangan, Perulangan, \& Operator Aritmatika:\*\* Validasi input, pencarian data, serta perhitungan total pemasukan, pengeluaran, dan sisa saldo.

\* \*\*Postman:\*\* Pengujian seluruh route dan fitur aplikasi.



\## Cara Menjalankan Program

1\. Pastikan \*\*Node.js\*\* sudah terpasang di perangkat.

2\. Buka terminal di folder proyek, lalu instal package yang dibutuhkan:

&#x20;  ```bash

&#x20;  npm install



```



3\. Jalankan server dengan perintah:

```bash

node app.js



```





4\. Buka aplikasi \*\*Postman\*\* dan akses alamat `http://localhost:3000`.



\## Daftar Route



| Method | Route | Keterangan |

| --- | --- | --- |

| `GET` | `/` | Menampilkan informasi aplikasi dan daftar route yang tersedia |

| `GET` | `/anggota` | Menampilkan daftar nama dan NIM anggota kelompok |

| `GET` | `/transaksi` | Menampilkan seluruh data transaksi |

| `GET` | `/transaksi/cari/:keyword` | Mencari transaksi berdasarkan nama atau kategori |

| `GET` | `/transaksi/:id` | Menampilkan detail transaksi berdasarkan ID |

| `POST` | `/transaksi` | Menambahkan data transaksi baru |

| `PUT` | `/transaksi/:id` | Memperbarui data transaksi berdasarkan ID |

| `DELETE` | `/transaksi/:id` | Menghapus data transaksi berdasarkan ID |

| `GET` | `/ringkasan` | Menampilkan total pemasukan, total pengeluaran, dan sisa saldo |



```



\*(Catatan kecil: di file `app.js` pada route `GET /`, kalau mau sekalian menghilangkan kata `"API"` di teks `'API Pencatatan Pengeluaran Mahasiswa'`, bisa diubah saja menjadi `'Aplikasi Pencatatan Pengeluaran Mahasiswa'` supaya seragam dengan `README.md`.)\*



```

