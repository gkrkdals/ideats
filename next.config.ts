import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: false
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.ideats.net',
          }
        ],
        destination: 'https://ideats.net/:path*',
        permanent: true,
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.vimeocdn.com"
      }
    ]
  },
};

export default nextConfig;
