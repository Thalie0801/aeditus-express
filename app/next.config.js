/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
