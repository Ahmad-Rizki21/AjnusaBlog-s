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
