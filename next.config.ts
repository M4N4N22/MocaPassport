import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 eslint: {
    // disables ESLint warnings/errors during Vercel builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
