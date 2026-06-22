import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ background: '#1a365d', padding: '1rem', color: '#fff', display: 'flex', gap: '20px' }}>
      <Link href="/" style={{ color: '#fff', fontWeight: 'bold', textDecoration: 'none' }}>Home</Link>
      <Link href="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products (SSG)</Link>
    </nav>
  );
}
