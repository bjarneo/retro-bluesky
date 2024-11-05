/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['bsky.social', 'cdn.bsky.social', 'cdn.bsky.app'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;