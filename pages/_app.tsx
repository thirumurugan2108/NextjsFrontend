import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth';
import ConfigProvider from '../utils/context/postContext';
import './styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ConfigProvider>
  );
}
export default MyApp;
