import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next Labs Application Suite',
  description: 'Built with unified routers architecture',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Requirement: Global navigation bar accessible everywhere */}
        <nav
          style={{
            padding: '15px 25px',
            background: '#2d3748',
            color: 'white',
            display: 'flex',
            gap: '20px',
          }}
        >
          <Link href="/products" style={{ color: 'white', textDecoration: 'none' }}>
            Pages Router (Products)
          </Link>
          <Link href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            App Router Dashboard
          </Link>
        </nav>
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}
