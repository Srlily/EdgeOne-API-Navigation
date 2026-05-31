import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.srliy.com',
      },
      {
        protocol: 'https',
        hostname: 'api.srliy.com',
      },
    ],
  },
};

export default nextConfig;
