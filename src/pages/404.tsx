import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', color: '#e53e3e', border: 'none' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Oops! Page not found.</p>
      <p>Notice that the Navbar is completely hidden on this error page.</p>
      <Link href="/" style={{ color: '#3182ce', textDecoration: 'underline' }}>Go Back Home</Link>
    </div>
  );
}
