import { GetStaticProps } from 'next';
import { useState, useDeferredValue, useMemo } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
}

interface ProductsProps {
  products: Product[];
}

export default function ProductsPage({ products }: ProductsProps) {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState(''); // 'price-asc', 'price-desc', 'rating'

  // Using useDeferredValue for optimized high-performance search filtering
  const deferredSearch = useDeferredValue(search);

  // Extract unique brands for the filter dropdown
  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return Array.from(new Set(allBrands));
  }, [products]);

  // Compute filtered and sorted products lists
  const processedProducts = useMemo(() => {
    let result = [...products];

    if (deferredSearch) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(deferredSearch.toLowerCase())
      );
    }

    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [deferredSearch, selectedBrand, sortBy, products]);

  return (
    <div>
      <h1>Products Catalog</h1>

      {/* Controls Bar */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />

        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} style={{ padding: '8px' }}>
          <option value="">All Brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px' }}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {processedProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price} | Rating: ⭐ {product.rating}</p>
            <Link href={`/products/${product.id}`} style={{ color: '#3182ce', fontWeight: 'bold' }}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  return {
    props: {
      products: data.products || [],
    },
  };
};
