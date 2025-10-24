import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output:"export",
  images: {
    unoptimized: true,
  },
  assetPrefix: '/',      // ensure relative assets
};

export default nextConfig;