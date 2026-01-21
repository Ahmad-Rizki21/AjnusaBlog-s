'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Edit, Trash2, Plus, Search, Calendar, User, FileText as FileTextIcon, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);

  const categories = ['Semua', 'Teknologi', 'Business', 'Industri', 'Case Study', 'Tips'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Teknologi': 'from-blue-500 to-cyan-500',
      'Business': 'from-purple-500 to-pink-500',
      'Industri': 'from-orange-500 to-red-500',
      'Case Study': 'from-green-500 to-emerald-500',
      'Tips': 'from-yellow-500 to-amber-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'Semua') {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, categoryFilter]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl shadow-2xl p-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <FileTextIcon className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Kelola Artikel Blog</h1>
                <p className="text-red-100 mt-1 flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>{filteredPosts.length} dari {posts.length} artikel ditampilkan</span>
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/admin/blog/new"
            className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-white text-red-700 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Tambah Artikel</span>
          </Link>
        </div>
      </div>

      {/* Filters with Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul atau konten..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white/50"
              />
            </div>
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white/50 font-medium cursor-pointer hover:border-red-300 transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-16 text-center border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm || categoryFilter !== 'Semua' ? 'Tidak ada artikel ditemukan' : 'Belum ada artikel'}
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              {searchTerm || categoryFilter !== 'Semua'
                ? 'Coba cari dengan kata kunci atau kategori lain'
                : 'Mulai dengan membuat artikel pertama Anda'}
            </p>
            {!searchTerm && categoryFilter === 'Semua' && (
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Plus size={20} />
                <span>Buat Artikel Pertama</span>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Category Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(post.category)}`}></div>
              
              <div className="p-6 space-y-4">
                {/* Status & Category */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r ${getCategoryColor(post.category)} text-white shadow-md`}>
                    {post.category}
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${
                      post.published
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-md'
                    }`}
                  >
                    {post.published ? '✓ Published' : '○ Draft'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-red-700 transition-colors min-h-[3.5rem]">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed min-h-[4.5rem]">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-red-600" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-red-600" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4">
                  <Link
                    href={`/blog/${post.id}`}
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all font-medium group/btn"
                    title="Lihat"
                  >
                    <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span>Lihat</span>
                  </Link>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all font-medium group/btn"
                    title="Edit"
                  >
                    <Edit size={16} className="group-hover/btn:scale-110 transition-transform" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all group/btn"
                    title="Hapus"
                  >
                    <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
