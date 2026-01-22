'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, FileText, Sparkles } from 'lucide-react';

const categories = ['Teknologi', 'Business', 'Industri', 'Case Study', 'Tips'];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Teknologi',
    author: 'Tim Artacom',
    published: true,
  });

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Ukuran gambar maksimal 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData({ ...formData, image: base64String });
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        setError(data.error || 'Gagal membuat artikel');
      }
    } catch {
      setError('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/blog"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-700 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Kembali ke Daftar Artikel</span>
      </Link>

      {/* Header with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl shadow-2xl p-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <FileText className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Buat Artikel Baru</h1>
            <p className="text-red-100 mt-1 flex items-center gap-2">
              <Sparkles size={16} />
              <span>Bagikan pengetahuan dan insight Anda</span>
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 animate-shake">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl font-bold">!</span>
            </div>
            <div>
              <h3 className="font-bold text-red-900">Terjadi Kesalahan</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Row 1: Judul & Slug */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Judul */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Judul Artikel *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-lg font-medium"
                placeholder="Masukkan judul artikel yang menarik..."
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Slug (URL) *
              </label>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all font-mono text-sm"
                placeholder="url-friendly-slug"
                required
              />
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="text-red-600">→</span>
                Preview URL: <code className="bg-gray-100 px-2 py-1 rounded">/blog/{formData.slug || '{slug}'}</code>
              </p>
            </div>
          </div>

          {/* Row 2: Kategori, Penulis, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Kategori *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition-all font-medium cursor-pointer"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Penulis *
              </label>
              <input
                id="author"
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="published" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Status
              </label>
              <div className="flex items-center h-full pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-500"></div>
                  <span className="ml-3 text-sm font-bold text-gray-900">
                    {formData.published ? '✓ Publish' : '○ Draft'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Row 3: Ringkasan & Image URL */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Excerpt */}
            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Ringkasan *
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={6}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none transition-all"
                placeholder="Tulis ringkasan singkat yang menarik untuk artikel Anda..."
                required
              />
              <p className="text-sm text-gray-500">
                {formData.excerpt.length} karakter
              </p>
            </div>

            {/* Image Upload with Drag & Drop */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Gambar Thumbnail
              </label>
              
              {!imagePreview && !formData.image ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {isDragging ? 'Lepaskan file di sini' : 'Drag & drop gambar atau klik untuk upload'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF hingga 5MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 group">
                  <img 
                    src={imagePreview || formData.image} 
                    alt="Preview" 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <label className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                      Ganti Gambar
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, image: '' });
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 4: Content (Full Width) */}
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              Konten Artikel *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={24}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none font-mono text-sm leading-relaxed transition-all"
              placeholder="Tulis konten artikel di sini...&#10;&#10;Gunakan enter untuk baris baru.&#10;Format plain text tanpa Markdown."
              required
            />
            <p className="text-sm text-gray-500">
              {formData.content.split('\n').length} baris • {formData.content.length} karakter
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-8 py-6 border-t-2 border-gray-100 flex items-center justify-between">
          <Link
            href="/admin/blog"
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all font-semibold"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="group relative inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={20} className="group-hover:scale-110 transition-transform" />
                <span>Simpan Artikel</span>
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
