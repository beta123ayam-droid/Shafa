import { NextResponse } from 'next/server';
import { createSession, safeEqual } from '@/lib/session';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(request) {
  const { LOGIN_USERNAME, LOGIN_PASSWORD, SESSION_SECRET } = process.env;
  if (!LOGIN_PASSWORD || !SESSION_SECRET) {
    return NextResponse.json({ error: 'Server belum dikonfigurasi.' }, { status: 500 });
  }

  const { username = '', password = '' } = await request.json().catch(() => ({}));
  // LOGIN_USERNAME kosong = hanya kata kunci yang diperiksa
  const okUser = LOGIN_USERNAME ? safeEqual(String(username), LOGIN_USERNAME) : true;
  const okPass = safeEqual(String(password), LOGIN_PASSWORD);

  if (!(okUser && okPass)) {
    await sleep(700); // memperlambat tebak-tebakan sandi
    return NextResponse.json(
      { error: LOGIN_USERNAME ? 'Nama pengguna atau kata sandi salah.' : 'Kata kunci salah.' },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('session', await createSession(7), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
