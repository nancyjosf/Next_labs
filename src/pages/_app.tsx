import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Hide Navbar on 404 and error pages
  const isErrorPage = router.pathname === '/404' || router.pathname === '/_error';

  return (
    <>
      {!isErrorPage && <Navbar />}
      <main style={{ padding: isErrorPage ? '0' : '20px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
