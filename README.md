ANGGA-DWI RESKY MAULANA 24090034
LINK RES : https://github.com/pynkdepth/UTS-ANGGA-DWI-RESKY-MAULANA-24090034.git
LINK DEPLOY : https://pynkdepth.github.io/UTS-ANGGA-DWI-RESKY-MAULANA-24090034/

DESKRIPSI FUNGSI HALAMAN
1. Halaman Login (index.html)
Halaman ini berfungsi sebagai gerbang autentikasi awal.

Fungsi Utama: Menerima input Email (sebagai username) dan Password (sebagai NIM).

Proses: Menjalankan validasi di sisi front-end untuk memastikan kedua field terisi. Jika valid, sistem akan menyajikan pesan sukses, lalu menggunakan JavaScript (window.location.href) untuk mengalihkan pengguna ke halaman dashboard.

📈 2. Halaman Dashboard (dashboard.html)
Halaman ini adalah pusat ringkasan data setelah pengguna berhasil login.

Fungsi Utama: Menyajikan gambaran umum (overview) dari data penting dalam bentuk tiga kartu summary (Total Produk, Total Penjualan, Total Revenue).

Proses: Data summary ditarik dari array dummy di script.js dan ditampilkan. Halaman ini juga menyediakan sidebar navigasi dan tombol aksi untuk menuju ke halaman daftar produk.

📦 3. Halaman List Data Produk (products.html)
Halaman ini didedikasikan untuk menampilkan dan mengelola data inventaris.

Fungsi Utama: Menampilkan daftar lengkap produk dalam format tabel, termasuk kolom Nama Produk, Harga, dan Stok.

Proses Aksi: Setiap baris produk memiliki dua tombol/ikon:

Edit (✏️): Menjalankan simulasi dengan menampilkan alert berisi nama produk.

Delete (🗑️): Menampilkan kotak konfirmasi hapus (confirm). Jika dikonfirmasi, baris tabel tersebut akan dihapus dari tampilan menggunakan metode DOM remove().
