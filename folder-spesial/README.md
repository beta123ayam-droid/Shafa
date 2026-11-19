# Folder Spesial: Halaman Pembukaan (animasi garis + ucapan)

Halaman pertama yang dilihat dia. Fotomu diubah jadi gambar garis yang
tergambar sendiri dengan kilau, lalu muncul ucapan kata demi kata, lalu tombol
ke galeri-polaroid.

## Yang diedit: hanya `config.js` dan satu foto
- `foto.jpg`: taruh fotomu di folder ini dengan nama itu (atau ubah `foto:` di config).
  Paling bagus foto berdua atau siluet dengan latar polos/gelap. Latar yang
  ramai membuat garisnya berantakan. Atur `detail` kalau garis kurang pas.
  Kalau foto tidak ada, yang tampil gambar hati contoh.
- `nama`, `judul`, `pesan`, `tombol`, `galeriUrl` di `config.js`.
- `musik` (opsional): taruh file lagu di folder ini, tulis namanya di config.
  Akan muncul layar "Ketuk untuk mulai" supaya lagu bisa diputar.

## Letak folder
    (folder induk)/
      galeri-polaroid/    aplikasi galeri (Next.js)
      folder-spesial/     folder ini
        index.html        tampilan dan animasi (tidak perlu diedit)
        config.js         nama, pesan, foto, musik, alamat galeri
        foto.jpg          fotomu (kamu tambahkan sendiri)

## Tes di komputer
Jalankan `npm run dev` di `galeri-polaroid`. Buka `index.html` dengan klik dua
kali. Kalau foto tidak muncul karena browser memblokir file lokal, jalankan
`npx serve folder-spesial` lalu buka alamat yang ditampilkan.

## Hosting (proyek Vercel terpisah)
1. Push folder ini ke GitHub, lalu di Vercel: Add New > Project >
   Framework Preset **Other**, tanpa build command. Deploy.
2. Ganti `galeriUrl` di `config.js` dengan alamat Vercel galeri, push lagi.
   Kalau masih `localhost`, tombol tidak akan jalan di HP (muncul pesan peringatan).

## Menghubungkan sebaliknya (opsional)
Di proyek galeri di Vercel, tambahkan environment variable `LANDING_URL`
berisi alamat halaman ini, lalu Redeploy.
