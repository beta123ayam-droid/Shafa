import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  // Kalau LOGIN_USERNAME dikosongkan, login cukup satu kolom "Kata kunci"
  return <LoginForm needsUsername={Boolean(process.env.LOGIN_USERNAME)} />;
}
