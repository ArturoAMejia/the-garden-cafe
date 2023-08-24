/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'tailwindui.com', 'images.unsplash.com', 'uploadthing.com']
  },
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  }
}

module.exports = nextConfig
