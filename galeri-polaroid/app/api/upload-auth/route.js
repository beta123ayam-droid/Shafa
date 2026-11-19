import { createHmac, randomBytes, randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { configured } from '@/lib/imagekit';
import { isAuthed } from '@/lib/session';

const TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export async function POST(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: 'Belum login' }, { status: 401 });
  }
  if (!configured()) {
    return NextResponse.json({ error: 'Kunci ImageKit belum diisi.' }, { status: 500 });
  }

  const { contentType, caption = '' } = await request.json().catch(() => ({}));
  const ext = TYPES[contentType];
  if (!ext) {
    return NextResponse.json({ error: 'Format foto tidak didukung.' }, { status: 400 });
  }

  const clean = String(caption)
    .trim()
    .slice(0, 40)
    .replace(/\s+/g, '_')
    .replace(/[^\w-]/g, '');
  // <timestamp>_<acak>__<keterangan>.<ext>  (bagian acak membuat link tidak bisa ditebak)
  const fileName = `${Date.now()}_${randomBytes(6).toString('hex')}__${clean}.${ext}`;

  // Tanda tangan sekali pakai agar browser boleh mengunggah langsung ke ImageKit
  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 30 * 60;
  const signature = createHmac('sha1', process.env.IMAGEKIT_PRIVATE_KEY)
    .update(token + String(expire))
    .digest('hex');

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    fileName,
  });
}
