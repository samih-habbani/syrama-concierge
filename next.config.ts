import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20% smaller than WebP on supporting browsers), WebP as
    // the fallback — meaningful savings on a slow/metered mobile connection
    // for zero visible quality loss.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
