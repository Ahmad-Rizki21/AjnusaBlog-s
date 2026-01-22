import { MetadataRoute } from 'next';
import { SERVICES, SOLUTIONS } from '@/data/constants';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';

// Static pages
const staticPages = [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    url: `${SITE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/promosi`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/kebijakan-cookie`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  },
];

// Service pages
const servicePages = SERVICES.map((service) => ({
  url: `${SITE_URL}/layanan/${service.id}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// Solution pages
const solutionPages = SOLUTIONS.map((solution) => ({
  url: `${SITE_URL}/solusi/${solution.id}`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.8,
}));

// Dynamic blog posts - fetch from API
async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return [];
    }

    const posts = await response.json();

    return posts.map((post: any) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get dynamic blog posts
  const blogPages = await getBlogPosts();

  return [...staticPages, ...servicePages, ...solutionPages, ...blogPages];
}
