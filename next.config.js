/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["ec-doodle.s3.amazonaws.com"],
  }
}

module.exports = nextConfig
