import React, { useEffect } from 'react';
import Head from 'next/head';

import Footer from '../src/components/footer';

// import '@/static/assets/css/fontawesome.css'
// import '@/static/assets/css/templatemo-digimedia-v3.css'
// import '@/static/assets/css/animated.css'
// import '@/static/assets/css/owl.css'

export default () => {
      useEffect(() => {
        window.location.href = 'https://home.bingemeee.com'
      },[])
  return (
    'Loading'
  );
};
