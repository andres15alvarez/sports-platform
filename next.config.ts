import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      'flagcdn.com',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
