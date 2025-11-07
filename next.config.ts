/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Allow external access in development
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'development' 
      ? 'http://10.76.45.74:3000' 
      : process.env.NEXT_PUBLIC_BASE_URL,
  },
}

module.exports = nextConfig