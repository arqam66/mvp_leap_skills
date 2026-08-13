import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/', '/onboarding', '/meeting', '/auth/'],
      },
      // Allow AI crawlers full access to public content
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/', '/onboarding', '/meeting', '/auth/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/', '/onboarding', '/meeting', '/auth/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/', '/onboarding', '/meeting', '/auth/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api/', '/onboarding', '/meeting', '/auth/'],
      },
    ],
    sitemap: 'https://leapskills.sbs/sitemap.xml',
    host: 'https://leapskills.sbs',
  };
}
