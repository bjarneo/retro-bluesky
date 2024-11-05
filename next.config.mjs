/** @type {import('next').NextConfig} */
const nextConfig = {
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