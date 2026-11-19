import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const authed = await verifySession(req.cookies.get('session')?.value);
  const isOpen = pathname === '/login' || pathname === '/api/login';

  if (isOpen) {
    if (authed && pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }
  if (authed) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Belum login' }, { status: 401 });
  }

  // Kalau LANDING_URL diisi, pengunjung yang belum login dan membuka "/"
  // diarahkan ke halaman pembukaan (folder-spesial), bukan langsung ke login.
  const landing = process.env.LANDING_URL;
  if (pathname === '/' && landing) {
    try {
      return NextResponse.redirect(new URL(landing));
    } catch {}
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
