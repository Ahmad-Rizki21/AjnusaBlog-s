'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { COMPANY_INFO } from '@/data/constants';
import { Calendar, User, ArrowLeft, Share2, Clock, Eye, ChevronRight, Megaphone } from 'lucide-react';

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

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Fetch all posts and find by slug
      const response = await fetch('/api/blog');
      const allPosts = await response.json();
      
      console.log('Looking for slug:', slug);
      console.log('Available posts:', allPosts.map((p: BlogPost) => ({ id: p.id, slug: p.slug, title: p.title })));
      
      const foundPost = allPosts.find((p: BlogPost) => p.slug === slug);
      
      console.log('Found post:', foundPost);

      if (foundPost) {
        setPost(foundPost);
        // Get related posts (same category, excluding current post)
        const related = allPosts
          .filter((p: BlogPost) => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 3);
        setRelatedPosts(related);
      } else {
        console.log('Post not found, setting notFoundState to true');
        setNotFoundState(true);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFoundState || !post) {
    notFound();
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-red-700 pt-32 pb-16 relative overflow-hidden">
          {/* Decorative Background Elements - More Visible */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Large Circle Background */}
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            
            {/* Geometric Shapes */}
            <div className="absolute top-10 right-20 w-32 h-32 border-4 border-white/20 rounded-2xl rotate-12 animate-pulse"></div>
            <div className="absolute bottom-10 right-40 w-24 h-24 border-4 border-white/15 rounded-full"></div>
            
            {/* Tech Pattern SVG - More Visible */}
            <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Network Connection Visualization */}
              <circle cx="450" cy="80" r="60" stroke="white" strokeWidth="3" fill="none"/>
              <circle cx="450" cy="80" r="40" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
              
              <circle cx="350" cy="200" r="50" stroke="white" strokeWidth="3" fill="none"/>
              <circle cx="350" cy="200" r="30" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
              
              <circle cx="500" cy="250" r="45" stroke="white" strokeWidth="3" fill="none"/>
              <circle cx="500" cy="250" r="25" stroke="white" strokeWidth="2" fill="white" fillOpacity="0.1"/>
              
              {/* Connection Lines */}
              <line x1="450" y1="80" x2="350" y2="200" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="350" y1="200" x2="500" y2="250" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
              <line x1="450" y1="80" x2="500" y2="250" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
              
              {/* Signal Waves */}
              <path d="M 420 60 Q 400 80 420 100" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
              <path d="M 480 60 Q 500 80 480 100" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
              
              {/* Data Points */}
              <circle cx="400" cy="140" r="6" fill="white" opacity="0.8"/>
              <circle cx="425" cy="165" r="5" fill="white" opacity="0.7"/>
              <circle cx="475" cy="165" r="5" fill="white" opacity="0.7"/>
              <circle cx="450" cy="200" r="4" fill="white" opacity="0.6"/>
            </svg>
            
            {/* Floating Dots Pattern */}
            <div className="absolute top-20 right-10 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute top-32 right-32 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute bottom-20 right-16 w-4 h-4 bg-white/25 rounded-full"></div>
            <div className="absolute bottom-32 right-48 w-2 h-2 bg-white/35 rounded-full"></div>
          </div>

          {/* Gradient Overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-r from-red-700 via-red-700/90 to-transparent"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center space-x-2 text-white/70 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={16} />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight size={16} />
              <span className="text-white/90">{post.category}</span>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm mb-8 group mx-auto"
            >
              <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Blog</span>
            </Link>

            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{Math.ceil(post.content.split(' ').length / 200)} menit baca</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye size={16} />
                  <span>{Math.floor(Math.random() * 500) + 100} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-8">
                <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden">
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative h-64 sm:h-96 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-8 lg:p-10">
                    {/* Share Button */}
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Bagikan artikel ini:
                      </p>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-3c-2.3,0-3.5,1.4-3.5,3.4v2.6h-2v4h2v12.5h5v-12.5h3.4l0.4-4Z"/></svg>
                        </button>
                        <button className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors" aria-label="Share on Instagram">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0.01,4.85,0.07c3.25,0.15,4.77,1.69,4.92,4.92c0.06,1.27,0.07,1.65,0.07,4.85s-0.01,3.58-0.07,4.85c-0.15,3.23-1.66,4.77-4.92,4.92c-1.27,0.06-1.65,0.07-4.85,0.07s-3.58-0.01-4.85-0.07c-3.26-0.15-4.77-1.69-4.92-4.92c-0.06-1.27-0.07-1.65-0.07-4.85s0.01-3.58,0.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23C8.42,2.17,8.8,2.16,12,2.16z M12,0C8.74,0,8.33,0.01,7.05,0.07c-4.27,0.2-6.78,2.71-6.98,6.98C0.01,8.33,0,8.74,0,12c0,3.26,0.01,3.67,0.07,4.95c0.2,4.27,2.71,6.78,6.98,6.98C8.33,23.99,8.74,24,12,24c3.26,0,3.67-0.01,4.95-0.07c4.27-0.2,6.78-2.71,6.98-6.98C23.99,15.67,24,15.26,24,12c0-3.26-0.01-3.67-0.07-4.95C23.78,2.71,21.27,0.2,17,0.01C15.67,0.01,15.26,0,12,0z M12,5.84c-3.4,0-3.8,0.01-5.05,0.06c-2.9,0.13-4.27,1.51-4.4,4.4C2.5,11.55,2.5,11.95,2.5,15.36s0.01,3.8,0.06,5.05c0.13,2.9,1.51,4.27,4.4,4.4c1.25,0.05,1.65,0.06,5.05,0.06s3.8-0.01,5.05-0.06c2.9-0.13,4.27-1.51,4.4-4.4c0.05-1.25,0.06-1.65,0.06-5.05s-0.01-3.8-0.06-5.05c-0.13-2.9-1.51-4.27-4.4-4.4C15.8,5.85,15.4,5.84,12,5.84z M12,16.92c-2.63,0-4.76-2.13-4.76-4.76c0-2.63,2.13-4.76,4.76-4.76c2.63,0,4.76,2.13,4.76,4.76C16.76,14.79,14.63,16.92,12,16.92z M12,9c-1.74,0-3.16,1.42-3.16,3.16c0,1.74,1.42,3.16,3.16,3.16c1.74,0,3.16-1.42,3.16-3.16C15.16,10.42,13.74,9,12,9z M18.41,5.59c-0.61,0-1.11,0.5-1.11,1.11c0,0.61,0.5,1.11,1.11,1.11c0.61,0,1.11-0.5,1.11-1.11C19.52,6.09,19.02,5.59,18.41,5.59z"/></svg>
                        </button>
                        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" aria-label="Share on LinkedIn">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                        {post.content}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          #{post.category.toLowerCase()}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          #internet
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          #vsat
                        </span>
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
                          #konektivitas
                        </span>
                      </div>
                    </div>

                    {/* Author Info Box */}
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-xl shrink-0">
                          {post.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            {post.author}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Content Writer & Technology Enthusiast
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            Berpengalaman dalam menulis artikel teknologi, khususnya seputar konektivitas internet, VSAT, dan solusi IT untuk bisnis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Side */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <div className="bg-linear-to-br from-red-700 to-red-800 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-xl font-bold mb-3">
                      Butuh Solusi Konektivitas?
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      Konsultasikan kebutuhan internet dan IT Anda dengan tim ahli kami.
                    </p>
                    <Link
                      href="/#contact"
                      className="block w-full text-center px-6 py-3 bg-white text-red-700 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md"
                    >
                      Hubungi Kami
                    </Link>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Artikel Terkait
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.id}
                            href={`/blog/${relatedPost.slug}`}
                            className="group block"
                          >
                            <div className="flex gap-3">
                              {relatedPost.image && (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                  <img
                                    src={relatedPost.image}
                                    alt={relatedPost.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(relatedPost.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/blog"
                        className="block mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-red-700 dark:text-red-400 font-medium hover:text-red-800 dark:hover:text-red-300 transition-colors"
                      >
                        Lihat Semua Artikel →
                      </Link>
                    </div>
                  )}

                  {/* Promosi Section */}
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Megaphone className="w-6 h-6" />
                      <h3 className="text-lg font-bold">
                        Promosi Menarik
                      </h3>
                    </div>
                    <p className="text-white/90 text-sm mb-4">
                      Dapatkan penawaran terbaik untuk solusi internet dan IT bisnis Anda.
                    </p>
                    <Link
                      href="/promosi"
                      className="block w-full text-center px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-md"
                    >
                      Lihat Semua Promo →
                    </Link>
                  </div>

                  {/* Newsletter Subscription */}
                  <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg border-2 border-red-100 dark:border-red-900/30">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      📧 Newsletter
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Dapatkan update artikel terbaru seputar teknologi dan konektivitas internet langsung ke email Anda.
                    </p>
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="email"
                        placeholder="Email Anda"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2.5 bg-red-700 text-white text-sm font-semibold rounded-lg hover:bg-red-800 transition-colors"
                      >
                        Berlangganan Sekarang
                      </button>
                    </form>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                      Kami menghargai privasi Anda. Tidak ada spam.
                    </p>
                  </div>

                  {/* Author/Company Info */}
                  <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      Tentang {COMPANY_INFO.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      Penyedia solusi konektivitas internet dan IT terpercaya untuk bisnis di Indonesia. Kami menghadirkan teknologi VSAT dan SD-WAN untuk mendukung transformasi digital perusahaan Anda.
                    </p>
                    <Link
                      href="/#about"
                      className="text-sm text-red-700 dark:text-red-400 font-medium hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      Pelajari Lebih Lanjut →
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Artikel Terkait
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-700 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Butuh Solusi Konektivitas?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Konsultasikan kebutuhan internet dan IT Anda dengan tim ahli kami.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <span>Hubungi Kami</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
