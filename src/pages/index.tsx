import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Welcome to Next.js Lab 1</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
        Exploring Static, Dynamic, and Catch-all Routing with SSG, Search, Filtering, and Sorting.
      </p>
      <Link href="/products" style={{ color: '#3182ce', fontSize: '1.2rem', textDecoration: 'underline' }}>
        Browse Products Catalog →
      </Link>
    </div>
  );
}
