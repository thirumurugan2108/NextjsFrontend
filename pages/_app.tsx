import type { AppProps } from 'next/app';
import Head from 'next/head'
import { AuthProvider } from '../auth';
import ConfigProvider from '../utils/context/postContext';
import React from "react";
import './styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <AuthProvider>
      <Head>
        <title>BingeMeee</title>
        <link rel="icon" href="/binge_fav_icon.png" />
      </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ConfigProvider>
  );
}
export default MyApp;
