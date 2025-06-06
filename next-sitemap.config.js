/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-sports-platform.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/api/*', '/server-sitemap-index.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://your-sports-platform.com/server-sitemap-index.xml',
    ],
  },
  // Transform function for dynamic sports URLs
  transform: async (config, path) => {
    // Custom priority for sports pages
    const sportsPriority = {
      '/': 1.0,
      '/football': 0.9,
      '/basketball': 0.9,
      '/baseball': 0.9,
    };

    return {
      loc: path,
      changefreq: path.includes('/game') ? 'hourly' : config.changefreq,
      priority: sportsPriority[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};