import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth';
import './styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
