/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //appDir: true,
    swcMinify: false,
  },
  images: {
    domains: ['images.pexels.com'],
  },
}

module.exports = nextConfig