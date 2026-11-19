# Galeri Foto Polaroid (Login + ImageKit)

Next.js, halaman login, dan foto disimpan di ImageKit (paket gratis).
Daftar foto hanya bisa dibaca setelah login.

## 1. Siapkan ImageKit
1. Masuk ke imagekit.io > **Developer options** (atau API keys).
2. Salin **Public key** dan **Private key**.
3. Tidak perlu membuat folder atau mengatur CORS: folder `/galeri` dibuat
   otomatis saat foto pertama diunggah.

Paket gratis: bandwidth 20 GB/bulan dan penyimpanan 3 GB. Dinding foto memakai
thumbnail kecil supaya bandwidth hemat. Ukuran maksimal 25 MB per foto.

## 2. Deploy ke Vercel
1. Push folder ini ke GitHub, lalu Import di vercel.com.
2. Settings > Environment Variables, isi variabel di `.env.example`:
   `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `LOGIN_PASSWORD`,
   `SESSION_SECRET` (acak 32+ karakter, `openssl rand -hex 32`), dan
   `LOGIN_USERNAME` (boleh dikosongkan untuk login satu kolom).
   Variabel `R2_...` dari versi lama sudah tidak dipakai, hapus saja.
3. Redeploy supaya variabel terbaca.

## Jalankan di komputer
    npm install
    cp .env.example .env.local   # lalu isi nilainya
    npm run dev

## Catatan keamanan
- Foto di ImageKit bersifat publik bagi yang tahu link persisnya. Nama file
  memuat kode acak 12 karakter sehingga tidak bisa ditebak, dan daftar foto
  hanya muncul setelah login. Tapi kalau seseorang menyalin link sebuah foto,
  link itu bisa dibuka tanpa login.
- Keterangan foto disimpan di nama file (maks. 40 huruf/angka, tanpa aksen).
- Format: JPG, PNG, WebP, GIF.

## Halaman pembukaan (opsional)
Folder `folder-spesial` (sejajar dengan folder ini) berisi halaman pembukaan.
Isi `LANDING_URL` dengan alamatnya supaya pengunjung tanpa login diarahkan
ke sana dulu.
