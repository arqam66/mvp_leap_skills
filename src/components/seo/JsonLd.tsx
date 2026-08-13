/**
 * JsonLd — Server-side structured data injector.
 *
 * Renders schema.org JSON-LD scripts that feed:
 *  - Google Rich Results (SEO)
 *  - AI answer engines like Perplexity, ChatGPT, Gemini (GEO)
 *  - Voice assistants and answer boxes (AEO)
 *
 * Usage: <JsonLd type="WebSite" /> or <JsonLd data={customObject} />
 */

const BASE_URL = 'https://leapskills.sbs';

// ── Schema definitions ──────────────────────────────────────────────────────

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Leap Skills',
  url: BASE_URL,
  description:
    'Creator monetization platform for technical experts — 1:1 consultations, digital products, cohorts, and instant Stripe payouts.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/explore?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
  copyrightYear: 2026,
  publisher: {
    '@type': 'Organization',
    name: 'Leap Skills',
    url: BASE_URL,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Leap Skills',
  alternateName: 'LeapSkills',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 200,
    height: 200,
  },
  description:
    'Leap Skills is a direct monetization platform for principal engineers, security architects, and independent technical advisors. Book 1:1 consultations, sell digital products, and receive instant Stripe Connect payouts with zero intermediary delays.',
  foundingDate: '2026',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'info@leapskills.sbs',
      telephone: '+923131203615',
      contactType: 'customer support',
      availableLanguage: ['English', 'Urdu'],
      areaServed: 'Worldwide',
    },
  ],
  sameAs: [
    // Add your social links here as you create them
    // 'https://twitter.com/leapskills',
    // 'https://linkedin.com/company/leapskills',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Sindh',
    addressLocality: 'Karachi',
  },
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Leap Skills',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: BASE_URL,
  description:
    'All-in-one creator monetization platform: 1:1 bookings, digital products, paid DMs, cohorts, and instant Stripe payouts from a single public profile link.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free to create a profile. 0% commission on first $1,000 earned. 2.5% flat fee after that.',
  },
  featureList: [
    '1:1 Consultation Booking',
    'Digital Product Sales',
    'Paid DMs',
    'Group Cohorts & Webinars',
    'Instant Stripe Connect Payouts',
    'Google Calendar 2-way Sync',
    'WebRTC Video Calls (no Zoom needed)',
    'CSV Data Exports',
    'Dark & Light Storefront Themes',
  ],
  screenshot: `${BASE_URL}/og-image.png`,
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do client bookings synchronize with my calendar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leap Skills offers direct 2-way Google Calendar synchronization. Once connected, booking slots are cross-referenced with your real-time calendar so clients only see your actual availability. Video meeting URLs are automatically generated and sent to both parties.',
      },
    },
    {
      '@type': 'Question',
      name: 'What platform fees does Leap Skills charge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We charge zero platform commission fees on the first $1,000 you earn. After that, a flat 2.5% platform fee is applied to bookings. Standard Stripe card processing fees (~2.9% + $0.30) also apply.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do direct payouts take to reach my bank account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Since Leap Skills uses Stripe Connect, client payments are cleared and deposited directly to your bank account within 5–10 minutes. There are no intermediary escrow holds or payout delays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I sell digital products like templates or PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In your dashboard you can list 1:1 strategy consultations, async reviews, or digital file downloads (like templates, PDFs, or code packs). You define the duration, price, platform, and delivery instructions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel or reschedule a consultation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can manage and reschedule bookings directly from your Command Center dashboard. Cancelling a confirmed booking will trigger an automatic full refund to the client via Stripe.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Leap Skills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leap Skills is a creator monetization platform for technical experts — including engineers, security architects, and DevOps specialists. It lets you earn from 1:1 consultations, digital product sales, paid DMs, and group cohorts, all from one public profile link with instant Stripe payouts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do clients need a Zoom account for video calls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Leap Skills generates WebRTC browser-based video call links automatically with each booking. Neither the creator nor the client needs a Zoom account or any third-party video app.',
      },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Technical Mentorship & Consulting Marketplace',
  name: 'Leap Skills Creator Platform',
  provider: {
    '@type': 'Organization',
    name: 'Leap Skills',
    url: BASE_URL,
  },
  description:
    'Connect with world-class technical mentors for 1:1 consultations, async code reviews, digital resource packs, and cohort-based programs.',
  url: `${BASE_URL}/explore`,
  areaServed: 'Worldwide',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: BASE_URL,
    serviceType: 'Online',
  },
};

// ── Component ───────────────────────────────────────────────────────────────

type SchemaType = 'WebSite' | 'Organization' | 'SoftwareApplication' | 'FAQ' | 'Service';

interface JsonLdProps {
  /** Predefined schema type — renders all global schemas if omitted */
  types?: SchemaType[];
  /** Optional custom schema object to render instead */
  data?: Record<string, unknown>;
}

const SCHEMA_MAP: Record<SchemaType, object> = {
  WebSite: websiteSchema,
  Organization: organizationSchema,
  SoftwareApplication: softwareApplicationSchema,
  FAQ: faqSchema,
  Service: serviceSchema,
};

export default function JsonLd({ types, data }: JsonLdProps) {
  if (data) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }

  const schemas = types
    ? types.map((t) => SCHEMA_MAP[t])
    : [websiteSchema, organizationSchema, softwareApplicationSchema, faqSchema, serviceSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
