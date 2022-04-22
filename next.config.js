/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    /* config options here */
    env: {
      basePath: '/docs',
      isDev: false,
      // apiBaseUrl:'http://localhost:3001/v1/'
      apiBaseUrl:'https://api.bingemeee.com/v1/'
    },
  }
  
  module.exports = nextConfig