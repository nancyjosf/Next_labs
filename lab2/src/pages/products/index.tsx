import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import ProductForm from '@/components/ProductForm';

export default function ProductsPage({
  serverQuote,
  initialProducts,
}: {
  serverQuote: string;
  initialProducts: any[];
}) {
  const { data: session } = useSession();

  useEffect(() => {
    if (serverQuote) {
      toast.success(` Today's Wisdom: "${serverQuote}"`, {
        position: 'top-right',
        duration: 4000,
      });
    }
  }, [serverQuote]);

  return (
    <div style={{ padding: '25px' }}>
      <Toaster />
      <h1>Pages Router Products</h1>
      {!session ? (
        <button onClick={() => signIn()}>Sign In</button>
      ) : (
        <button onClick={() => signOut()}>Sign Out ({session.user?.name})</button>
      )}
      <h3>
        Products List ({session ? 'All items visible' : 'Showing 3 items only'})
      </h3>
      <ul>
        {initialProducts.map((p: any) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
      {session && (
        <div style={{ marginTop: '20px' }}>
          <h3>Add / Update Product</h3>
          <ProductForm />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const quoteCollection = [
    "Next.js handles SSR natively with superior performance.",
    "Component modularity yields clean codebase expansion.",
    "Auth.js guarantees robust endpoint shielding.",
  ];
  const serverQuote =
    quoteCollection[Math.floor(Math.random() * quoteCollection.length)];

  // Fetching data mock locally inside server context
  const res = await fetch('http://localhost:3000/api/products');
  const initialProducts = res.ok ? await res.json() : [];

  return { props: { serverQuote, initialProducts } };
}
