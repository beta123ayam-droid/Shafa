// ===== FILE YANG KAMU EDIT =====
// Ganti teks di dalam tanda kutip. Biarkan tanda kutip dan koma tetap ada.
window.PENGATURAN = {
  // Alamat aplikasi galeri-polaroid (tanpa garis miring di akhir).
  // PENTING: setelah dihosting, WAJIB diganti dengan alamat Vercel galeri,
  // misalnya https://galeri-foto.vercel.app
  // (localhost hanya jalan di komputer yang sedang menjalankan galeri).
  // Tes di komputer: http://localhost:3000
  galeriUrl: 'https://shafa-galeri-polaroid.vercel.app',

  // Foto yang diubah jadi gambar garis. Taruh file-nya di folder ini.
  // Kalau file tidak ada, yang tampil sketsa orang contoh.
  foto: 'foto.jpg',

  // Warna halaman: 'samudra' (latar samudra hijau-merah yang bergerak, gambar tetap hitam putih), 'hitam-putih' (kertas putih, tinta hitam) atau 'pastel' (latar gelap, garis merah muda-biru).
  tema: 'hitam-putih',

  // Jenis gambar di foto.jpg:
  //   'sketsa' = gambar tinta/pensil hitam di kertas putih (guratannya dipakai langsung).
  //   'foto'   = foto biasa (yang diambil hanya garis tepinya; paling bagus latar polos/gelap).
  jenisFoto: 'sketsa',

  // Nama dia
  nama: 'Najwa Shafa Az-zahra',

  // Judul di atas nama
  judul: 'Selamat ulang tahun',

  // Kalimat yang muncul kata demi kata. Pakai \n untuk pindah baris.
  pesan: 'selamat ulang tahun shafa walaupun kadang ngeselin tapi lu asik jadi gw bikinin ini\n semoga panjang umur dan murah hati dan jangan marah-marah terus\n Apa yang udah lu mulai harus lu akhiri.',

  // Tulisan di tombol
  tombol: 'Buka galeri',

  // Opsional: nama file lagu di folder ini (misal 'lagu.mp3').
  // Kalau diisi, muncul layar "Ketuk untuk mulai" supaya lagu bisa langsung diputar.
  musik: '',

  // Banyaknya garis, 0 sampai 1. Naikkan kalau garis terlalu sedikit,
  // turunkan kalau terlalu ramai.
  detail: 0.6
};
