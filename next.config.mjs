/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['vm-6mu19hkgl8iwb7902wu90vk5.vusercontent.net'],
}

export default nextConfig
