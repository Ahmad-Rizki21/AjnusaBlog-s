import { Metadata } from 'next';
import { generateArticleMetadata } from '@/lib/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';
import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for blog post pages
 */
export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return generateArticleMetadata({
        title: 'Blog Post',
        description: 'Artikel dan informasi seputar layanan internet dan solusi IT dari AJNUSA.',
        slug,
        publishedTime: new Date().toISOString(),
      });
    }

    const posts: BlogPost[] = await response.json();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      return generateArticleMetadata({
        title: 'Blog Post',
        description: 'Artikel dan informasi seputar layanan internet dan solusi IT dari AJNUSA.',
        slug,
        publishedTime: new Date().toISOString(),
      });
    }

    return generateArticleMetadata({
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      image: post.image || undefined,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      author: post.author,
      category: post.category,
      tags: [post.category, 'internet', 'VSAT', 'IT solution'],
    });
  } catch {
    return generateArticleMetadata({
      title: 'Blog Post',
      description: 'Artikel dan informasi seputar layanan internet dan solusi IT dari AJNUSA.',
      slug,
      publishedTime: new Date().toISOString(),
    });
  }
}

export default async function BlogPostLayout({ children, params }: LayoutProps) {
  const { slug } = await params;

  // Fetch post data for structured data
  let post: BlogPost | null = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog`, {
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      const posts: BlogPost[] = await response.json();
      post = posts.find((p) => p.slug === slug) || null;
    }
  } catch {
    post = null;
  }

  const schemas = [];
  if (post) {
    const articleSchema = generateArticleSchema({
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      image: post.image,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      author: post.author,
      category: post.category,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Blog', url: `${SITE_URL}/blog` },
      { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
    ]);

    schemas.push(
      <JsonLd key="article" id="article" {...articleSchema} />,
      <JsonLd key="breadcrumb" id="breadcrumb" {...breadcrumbSchema} />
    );
  }

  return (
    <>
      {schemas}
      {children}
    </>
  );
}
