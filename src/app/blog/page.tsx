'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { COMPANY_INFO } from '@/data/constants';

const categories = ['Semua', 'Teknologi', 'Business', 'Industri', 'Case Study', 'Tips'];

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(6);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?published=true');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Semua') {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  // Get posts to display
  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + postsPerPage);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6); // Reset count when changing category
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Header */}
        <section className="bg-red-700 min-h-[400px] flex items-center pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Blog {COMPANY_INFO.name}
              </h1>
              <p className="text-lg text-white/90">
                Wawasan, tips, dan artikel terbaru seputar konektivitas internet,
                teknologi VSAT, dan solusi IT untuk bisnis Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-6 sticky top-16 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-red-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Result count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Menampilkan {displayedPosts.length} dari {filteredPosts.length} artikel
              {activeCategory !== 'Semua' && ` di kategori "${activeCategory}"`}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {displayedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    >
                      Muat Lebih Banyak Artikel ({filteredPosts.length - visibleCount} lagi)
                    </button>
                  </div>
                )}

                {/* End of list message */}
                {!hasMore && displayedPosts.length > 0 && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {displayedPosts.length === filteredPosts.length && filteredPosts.length > 6
                        ? `Semua ${filteredPosts.length} artikel telah ditampilkan`
                        : 'Tidak ada artikel lainnya'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {posts.length === 0 ? 'Belum ada artikel' : 'Tidak ada artikel di kategori ini'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {posts.length === 0
                    ? 'Artikel akan segera tersedia. Kembali lagi nanti!'
                    : 'Coba kategori lain atau kembali lagi nanti untuk artikel terbaru.'}
                </p>
                {posts.length > 0 && (
                  <button
                    onClick={() => handleCategoryClick('Semua')}
                    className="px-6 py-2 bg-red-700 text-white font-medium rounded-full hover:bg-red-800 transition-colors"
                  >
                    Lihat Semua Artikel
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-700 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Butuh Solusi Konektivitas untuk Bisnis Anda?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Konsultasikan kebutuhan internet dan IT Anda dengan tim ahli kami.
                Kami siap membantu menemukan solusi terbaik untuk bisnis Anda.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
