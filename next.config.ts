import type { NextConfig } from "next";

const nextConfig = {
  transpilePackages: ['zod', '@langchain/core', '@langchain/community', 'langchain', '@hookform/resolvers'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
