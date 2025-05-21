import nextTranslate from 'next-translate-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
  images: {
    domains: [
      'images.unsplash.com',
      'logos-world.net',
      '1000logos.net',
      'placehold.co',
      'upload.wikimedia.org',
      'i.pravatar.cc',
      'upload.wikimedia.org',
      'seeklogo.com',
      'images.seeklogo.com',
      'www.citypng.com',
      'sportslogos.net',
    ],

    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextTranslate(nextConfig);
