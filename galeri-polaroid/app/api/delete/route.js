import { NextResponse } from 'next/server';
import { basicAuth, configured } from '@/lib/imagekit';
import { isAuthed } from '@/lib/session';

export async function POST(request) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ error: 'Belum login' }, { status: 401 });
  }
  if (!configured()) {
    return NextResponse.json({ error: 'Kunci ImageKit belum diisi.' }, { status: 500 });
  }
  const { id } = await request.json().catch(() => ({}));
  if (typeof id !== 'string' || !/^[\w-]+$/.test(id)) {
    return NextResponse.json({ error: 'ID foto tidak valid.' }, { status: 400 });
  }
  const res = await fetch(`https://api.imagekit.io/v1/files/${id}`, {
    method: 'DELETE',
    headers: { Authorization: basicAuth() },
  });
  if (!res.ok && res.status !== 404) {
    return NextResponse.json({ error: 'Gagal menghapus di ImageKit.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
