import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'ui-avatars.com' // tambahkan domain ini
    ],
    // Jika kamu ingin lebih aman dengan remotePatterns (Next.js 14+):
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: '/du0tz73ma/image/upload/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'ui-avatars.com',
    //     pathname: '/api/**',
    //   },
    // ],
  }
};

export default nextConfig;
