import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (~20% smaller than WebP on supporting browsers), WebP as
    // the fallback — meaningful savings on a slow/metered mobile connection
    // for zero visible quality loss.
    formats: ['image/avif', 'image/webp'],
    // Mobile-first breakpoints: the Next.js default's smallest bucket is
    // 640px, which over-serves a 360-420px phone. 2048/3840 are dropped —
    // nothing on this site is ever displayed full-bleed at 4K, so those
    // buckets only add cache/build permutations nothing uses.
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1280, 1920],
    // Every next/image call in this codebase uses the default quality
    // (75) — declared explicitly so that's documented, not implicit.
    qualities: [75],
    // Next's own default (4h) causes needless re-optimization churn.
    // 31 days (Next's documented "reduce revalidations" recommendation)
    // instead of a full year: villa/yacht uploads get a fresh hashed
    // filename per upload (safe to cache forever), but /assets/* site
    // images are sometimes replaced under the SAME filename on deploy —
    // a full year would make that kind of update take a year to
    // reach returning visitors. 31 days keeps most of the benefit
    // without that risk.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Villa/yacht photos: every upload gets a fresh, hash-suffixed
        // filename (confirmed in lib/*-service.ts + the admin upload
        // route), so a given filename's content never changes — safe to
        // cache for a full year. Before this, `next start` served these
        // with `Cache-Control: max-age=0`, so every single page view
        // re-downloaded every photo from scratch, even seconds apart.
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Site-bundled images/video in /assets. Filenames here CAN be
        // reused for different content on a future deploy (this project's
        // own git history already did that with the hero video), so this
        // stays short of `immutable`: a day of full caching, then up to a
        // week serving the last version instantly while revalidating in
        // the background, instead of every visitor re-fetching the same
        // unchanged 7+MB video on every navigation.
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
};

export default nextConfig;
