/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd13k13wj6adfdf.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig
