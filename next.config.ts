import nextTranslate from 'next-translate';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
};

export default nextTranslate(nextConfig);
