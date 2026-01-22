import { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';
const DEFAULT_OG_IMAGE = '/images/og-image.jpg';

interface OpenGraphParams {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Generate Open Graph metadata for social media sharing
 */
export function generateOpenGraph(params: OpenGraphParams): Metadata['openGraph'] {
  const {
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    url = SITE_URL,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = params;

  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const baseOpenGraph: Metadata['openGraph'] = {
    title,
    description,
    url,
    siteName: COMPANY_INFO.name,
    images: [
      {
        url: fullImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'id_ID',
    type,
  };

  // Article-specific fields
  if (type === 'article') {
    return {
      ...baseOpenGraph,
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    } as Metadata['openGraph'];
  }

  return baseOpenGraph;
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(params: {
  title: string;
  description: string;
  image?: string;
  card?: 'summary' | 'summary_large_image';
}): Metadata['twitter'] {
  const { title, description, image = DEFAULT_OG_IMAGE, card = 'summary_large_image' } = params;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    card,
    title,
    description,
    images: [fullImageUrl],
    site: '@ajnusa',
    creator: '@ajnusa',
  };
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata(params: OpenGraphParams & {
  canonical?: string;
  noindex?: boolean;
}): Metadata {
  const {
    title,
    description,
    image,
    url,
    type,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    canonical,
    noindex = false,
  } = params;

  const fullUrl = url || SITE_URL;
  const canonicalUrl = canonical || fullUrl;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: generateOpenGraph({
      title,
      description,
      image,
      url: fullUrl,
      type,
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    }),
    twitter: generateTwitterCard({
      title,
      description,
      image,
      card: type === 'article' ? 'summary_large_image' : 'summary_large_image',
    }),
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
  };
}

/**
 * Generate article metadata for blog posts
 */
export function generateArticleMetadata(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
}): Metadata {
  const {
    title,
    description,
    slug,
    image,
    publishedTime,
    modifiedTime,
    author = 'Tim AJNUSA',
    category = 'Teknologi',
    tags = [category],
  } = params;

  return generateMetadata({
    title: `${title} - AJNUSA Blog`,
    description,
    image,
    url: `${SITE_URL}/blog/${slug}`,
    type: 'article',
    publishedTime,
    modifiedTime,
    authors: [author],
    section: category,
    tags,
  });
}

/**
 * Generate service/solution metadata
 */
export function generateServiceMetadata(params: {
  title: string;
  description: string;
  id: string;
  type: 'layanan' | 'solusi';
  image?: string;
  category?: string;
}): Metadata {
  const { title, description, id, type, image, category } = params;

  return generateMetadata({
    title: `${title} - AJNUSA`,
    description,
    image,
    url: `${SITE_URL}/${type}/${id}`,
    type: 'website',
    tags: category ? [type, category] : [type],
  });
}
