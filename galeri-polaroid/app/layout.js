import './globals.css';
import { Caveat, DM_Sans } from 'next/font/google';

const hand = Caveat({ subsets: ['latin'], variable: '--font-hand' });
const ui = DM_Sans({ subsets: ['latin'], variable: '--font-ui' });

export const metadata = {
  title: 'Galeri Foto',
  description: 'Kumpulan foto pribadi',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${hand.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
