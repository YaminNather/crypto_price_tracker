import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import 'react-alice-carousel/lib/alice-carousel.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
