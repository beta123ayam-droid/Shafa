# Daftar file yang perlu diedit

1. folder-spesial/config.js
   - galeriUrl: WAJIB diganti ke alamat Vercel galeri (bukan localhost).
   - nama, pesan, tombol.
   - Tambahkan fotomu ke folder-spesial dengan nama foto.jpg
     (diubah jadi gambar garis). Lagu opsional: isi `musik`.

2. Environment Variables di Vercel (proyek galeri-polaroid), bukan file:
   - IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY (imagekit.io > Developer options)
   - LOGIN_PASSWORD  : kata kunci untuk dia (wajib)
   - LOGIN_USERNAME  : kosongkan kalau mau login satu kolom
   - SESSION_SECRET  : acak, buat dengan `openssl rand -hex 32`
   - LANDING_URL     : alamat halaman pembukaan (opsional)
   - Variabel R2_... dari versi lama: hapus.

Setelah mengganti file, push ke GitHub; Vercel akan deploy ulang otomatis.
Setelah mengganti environment variable, klik Redeploy.
