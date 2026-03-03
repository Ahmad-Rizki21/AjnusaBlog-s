import { COMPANY_INFO, CONTACT_INFO } from '@/data/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';

/**
 * Generate Organization Schema (JSON-LD)
 * https://schema.org/Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_INFO.fullName,
    alternateName: COMPANY_INFO.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-ajnusa.png`,
    description: COMPANY_INFO.description,
    foundedDate: `${COMPANY_INFO.since}-01-01`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phones?.[0],
      email: CONTACT_INFO.email,
      contactType: 'Sales',
      areaServed: 'ID',
      availableLanguage: 'Indonesian',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
      addressLocality: 'Bekasi',
      addressRegion: 'Jawa Barat',
      postalCode: '17134',
      addressCountry: 'ID',
    },
    sameAs: Object.values(CONTACT_INFO.social || {}).filter(Boolean),
  };
}

/**
 * Generate Article Schema for blog posts (JSON-LD)
 * https://schema.org/Article
 */
export function generateArticleSchema(params: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  category: string;
}) {
  const { title, description, slug, image, publishedTime, modifiedTime, author, category } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || `${SITE_URL}/images/og-image.jpg`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-ajnusa.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    articleSection: category,
    inLanguage: 'id-ID',
  };
}

/**
 * Generate Service Schema (JSON-LD)
 * https://schema.org/Service
 */
export function generateServiceSchema(params: {
  name: string;
  description: string;
  id: string;
  type: 'layanan' | 'solusi';
  category?: string;
  image?: string;
}) {
  const { name, description, id, type, category, image } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: COMPANY_INFO.fullName,
      url: SITE_URL,
    },
    serviceType: category || 'Internet Service Provider',
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Layanan ${name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name,
          },
          areaServed: 'Indonesia',
        },
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${type}/${id}`,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
      },
    }),
  };
}

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 * https://schema.org/BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string;
  url: string }>) {
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Generate FAQPage Schema (JSON-LD)
 * https://schema.org/FAQPage
 */
export function generateFAQSchema(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Product/Service schema with offer (JSON-LD)
 * https://schema.org/Product
 */
export function generateProductSchema(params: {
  name: string;
  description: string;
  image?: string;
  category: string;
}) {
  const { name, description, image, category } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${SITE_URL}/images/og-image.jpg`,
    category,
    brand: {
      '@type': 'Brand',
      name: COMPANY_INFO.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      url: SITE_URL,
      seller: {
        '@type': 'Organization',
        name: COMPANY_INFO.fullName,
      },
    },
  };
}

/**
 * Generate WebSite schema (JSON-LD)
 * https://schema.org/WebSite
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY_INFO.name,
    url: SITE_URL,
    description: COMPANY_INFO.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_INFO.fullName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo-ajnusa.png`,
      },
    },
  };
}

/**
 * Generate LocalBusiness Schema (JSON-LD)
 * Critical for local SEO and Google Maps
 * https://schema.org/LocalBusiness
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TelecommunicationsService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: COMPANY_INFO.fullName,
    alternateName: COMPANY_INFO.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-ajnusa.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description: COMPANY_INFO.description,
    telephone: CONTACT_INFO.phones?.[0],
    email: CONTACT_INFO.email,
    foundingDate: `${COMPANY_INFO.since}-01-01`,
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    paymentAccepted: 'Cash, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
      addressLocality: 'Bekasi',
      addressRegion: 'Jawa Barat',
      postalCode: '17134',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2615,
      longitude: 106.9901,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    sameAs: Object.values(CONTACT_INFO.social || {}).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Internet & IT',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Internet Service',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VSAT Broadband' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SCPC Link' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fiber Optic' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SD-WAN / VPN' } },
          ],
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate SiteNavigationElement Schema (JSON-LD)
 * Helps Google discover important pages
 * https://schema.org/SiteNavigationElement
 */
export function generateSiteNavigationSchema() {
  const navItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tentang Kami', url: `${SITE_URL}/#about` },
    { name: 'Layanan', url: `${SITE_URL}/#services` },
    { name: 'Solusi', url: `${SITE_URL}/#solutions` },
    { name: 'Klien', url: `${SITE_URL}/#clients` },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: 'Promosi', url: `${SITE_URL}/promosi` },
    { name: 'Hubungi Kami', url: `${SITE_URL}/#contact` },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: navItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
