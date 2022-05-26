/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    env: {
      basePath: '/docs',
      isDev: false,
      apiBaseUrl:'https://api.bingemeee.com/v1/'
    },
    webpack: (config,options) => {
      // Important: return the modified config
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  }
  console.log(nextConfig)
  module.exports = nextConfig
