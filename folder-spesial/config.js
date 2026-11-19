// ===== FILE YANG KAMU EDIT =====
// Ganti teks di dalam tanda kutip. Biarkan tanda kutip dan koma tetap ada.
window.PENGATURAN = {
  // Alamat aplikasi galeri-polaroid (tanpa garis miring di akhir).
  // PENTING: setelah dihosting, WAJIB diganti dengan alamat Vercel galeri,
  // misalnya https://galeri-foto.vercel.app
  // (localhost hanya jalan di komputer yang sedang menjalankan galeri).
  // Tes di komputer: http://localhost:3000
  galeriUrl: 'http://localhost:3000',

  // Foto yang diubah jadi gambar garis. Taruh file-nya di folder ini.
  // Paling bagus: foto berdua / siluet dengan latar polos atau gelap.
  // Kalau file tidak ada, yang tampil gambar hati contoh.
  foto: 'foto.jpg',

  // Nama dia
  nama: 'Nama Dia',

  // Judul di atas nama
  judul: 'Selamat ulang tahun',

  // Kalimat yang muncul kata demi kata. Pakai \n untuk pindah baris.
  pesan: 'Ini hadiah kecil untukmu:\ntempat menyimpan foto-foto yang kamu suka.',

  // Tulisan di tombol
  tombol: 'Buka galeri',

  // Opsional: nama file lagu di folder ini (misal 'lagu.mp3').
  // Kalau diisi, muncul layar "Ketuk untuk mulai" supaya lagu bisa langsung diputar.
  musik: '',

  // Banyaknya garis, 0 sampai 1. Naikkan kalau garis terlalu sedikit,
  // turunkan kalau terlalu ramai.
  detail: 0.6
};
