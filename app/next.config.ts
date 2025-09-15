import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
