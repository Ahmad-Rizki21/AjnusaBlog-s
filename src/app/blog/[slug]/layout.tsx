import { Metadata } from 'next';
import { generateArticleMetadata } from '@/lib/metadata';
import React from 'react';

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

export default function BlogPostLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
