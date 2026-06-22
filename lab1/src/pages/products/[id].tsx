import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
}

interface DetailProps {
  product: Product;
}

export default function ProductDetail({ product }: DetailProps) {
  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Link href="/products" style={{ color: '#3182ce' }}>&larr; Back to Products</Link>
      <h1 style={{ marginTop: '20px' }}>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%', borderRadius: '8px' }} />
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Brand: {product.brand}</p>
      <p>{product.description}</p>
      <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Rating:</strong> ⭐ {product.rating} / 5</p>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  const paths = data.products.map((product: any) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return {
    props: { product },
  };
};
