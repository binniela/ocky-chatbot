/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Disable server-side rendering for the entire application
  ssr: false,
}

module.exports = nextConfig

