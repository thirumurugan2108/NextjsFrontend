import type { AppProps } from 'next/app';
import Head from 'next/head'
import { AuthProvider } from '../auth';
import ConfigProvider from '../utils/context/postContext';
import React from "react";
import './styles.scss'
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <CookiesProvider>
        <AuthProvider>
        <Head>
          <title>BingeMeee</title>
          <link rel="icon" href="/binge_fav_icon.png" />
        </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </CookiesProvider>
    </ConfigProvider>
  );
}
export default MyApp;
