import { NextResponse } from 'next/server';
import { basicAuth, configured } from '@/lib/imagekit';
import { isAuthed } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: 'Belum login' }, { status: 401 });
  }
  if (!configured()) {
    return NextResponse.json({ error: 'Kunci ImageKit belum diisi.' }, { status: 500 });
  }

  const all = [];
  for (let skip = 0, page = 0; page < 50; page++, skip += 100) {
    const url =
      'https://api.imagekit.io/v1/files?type=file&sort=DESC_CREATED&limit=100' +
      `&skip=${skip}&path=${encodeURIComponent('/galeri/')}`;
    const res = await fetch(url, {
      headers: { Authorization: basicAuth(), Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Gagal membaca ImageKit.' }, { status: 502 });
    }
    const items = await res.json();
    all.push(...items);
    if (items.length < 100) break;
  }

  // Thumbnail kecil untuk dinding, versi lebih besar untuk tampilan penuh (hemat bandwidth)
  const photos = all
    .filter((f) => f.type === 'file' && f.url)
    .map((f) => ({
      id: f.fileId,
      name: f.name,
      createdAt: f.createdAt,
      thumb: `${f.url}?tr=w-600`,
      full: `${f.url}?tr=w-1400`,
    }));

  // Penyimpanan terpakai = jumlah ukuran semua file di /galeri
  const limitGb = Number(process.env.STORAGE_LIMIT_GB) || 3;
  const limitBytes = limitGb * 1024 * 1024 * 1024;
  const usedBytes = all.reduce((sum, f) => sum + (Number(f.size) || 0), 0);
  const storage = {
    usedBytes,
    limitBytes,
    freeBytes: Math.max(limitBytes - usedBytes, 0),
  };
  return NextResponse.json({ photos, storage });
}
