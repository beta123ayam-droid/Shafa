// Sesi sederhana: cookie "session" berisi "<kedaluwarsa>.<tanda tangan HMAC>".
// Memakai Web Crypto supaya jalan di middleware (edge) maupun route handler.
const enc = new TextEncoder();

function toHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getKey() {
  return crypto.subtle.importKey(
    'raw',
    enc.encode(process.env.SESSION_SECRET || ''),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function sign(text) {
  return toHex(await crypto.subtle.sign('HMAC', await getKey(), enc.encode(text)));
}

export function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function createSession(days = 7) {
  const exp = String(Date.now() + days * 24 * 60 * 60 * 1000);
  return `${exp}.${await sign(exp)}`;
}

export async function verifySession(token) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await sign(exp));
}

export async function isAuthed(request) {
  return verifySession(request.cookies.get('session')?.value);
}
