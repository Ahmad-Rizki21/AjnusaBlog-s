'use client';

import { useEffect, useState } from 'react';
import { Plus, Megaphone, Edit, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon, Code, Eye, EyeOff } from 'lucide-react';
import { api } from '@/lib/api-fetch';
import { Permission, checkCurrentUserPermission } from '@/lib/permissions';

interface Popup {
  id: string;
  title: string;
  type: 'IMAGE' | 'HTML';
  content: string;
  link: string | null;
  isActive: boolean;
  delay: number;
  showClose: boolean;
  width: number | null;
  height: number | null;
  createdAt: string;
  updatedAt: string;
  creator?: {
    id: string;
    name: string;
    username: string;
  };
}

export default function PopupsPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'IMAGE' as 'IMAGE' | 'HTML',
    content: '',
    link: '',
    isActive: false,
    delay: 0,
    showClose: true,
    width: '',
    height: '',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Check permissions
  const canEdit = checkCurrentUserPermission(Permission.EDIT_BLOG);
  const canDelete = checkCurrentUserPermission(Permission.DELETE_BLOG);

  useEffect(() => {
    fetchPopups();
  }, []);

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleImageUpload = (file: File) => {
    // Validate image type
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran gambar maksimal 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setFormData({ ...formData, content: base64String });
      setUploadError('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview('');
    setFormData({ ...formData, content: '' });
  };

  const fetchPopups = async () => {
    try {
      const response = await api.get('/api/admin/popups');
      const data = await response.json();
      setPopups(data);
    } catch (error) {
      console.error('Error fetching popups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPopup
        ? `/api/admin/popups/${editingPopup.id}`
        : '/api/admin/popups';

      const payload = {
        title: formData.title,
        type: formData.type,
        content: formData.content,
        link: formData.link || null,
        isActive: formData.isActive,
        delay: Number(formData.delay) || 0,
        showClose: formData.showClose,
        width: formData.width ? Number(formData.width) : null,
        height: formData.height ? Number(formData.height) : null,
      };

      const response = editingPopup
        ? await api.put(url, payload)
        : await api.post(url, payload);

      if (response.ok) {
        setShowModal(false);
        setEditingPopup(null);
        setFormData({
          title: '',
          type: 'IMAGE',
          content: '',
          link: '',
          isActive: false,
          delay: 0,
          showClose: true,
          width: '',
          height: '',
        });
        setImagePreview('');
        fetchPopups();
      } else {
        const error = await response.json();
        alert(error.error || 'Gagal menyimpan popup');
      }
    } catch (error) {
      console.error('Error saving popup:', error);
    }
  };

  const handleEdit = (popup: Popup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      type: popup.type,
      content: popup.content,
      link: popup.link || '',
      isActive: popup.isActive,
      delay: popup.delay,
      showClose: popup.showClose,
      width: popup.width?.toString() || '',
      height: popup.height?.toString() || '',
    });
    // Set preview if editing IMAGE type with existing content
    if (popup.type === 'IMAGE' && popup.content) {
      setImagePreview(popup.content);
    } else {
      setImagePreview('');
    }
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus popup ini?')) return;

    try {
      const response = await api.delete(`/api/admin/popups/${id}`);

      if (response.ok) {
        fetchPopups();
      } else {
        const error = await response.json();
        alert(error.error || 'Gagal menghapus popup');
      }
    } catch (error) {
      console.error('Error deleting popup:', error);
    }
  };

  const handleToggleActive = async (popup: Popup) => {
    try {
      const response = await api.put(`/api/admin/popups/${popup.id}`, {
        isActive: !popup.isActive,
      });

      if (response.ok) {
        fetchPopups();
      }
    } catch (error) {
      console.error('Error toggling popup:', error);
    }
  };

  const openAddModal = () => {
    setEditingPopup(null);
    setFormData({
      title: '',
      type: 'IMAGE',
      content: '',
      link: '',
      isActive: false,
      delay: 0,
      showClose: true,
      width: '',
      height: '',
    });
    setImagePreview('');
    setUploadError('');
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 rounded-2xl shadow-2xl p-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Megaphone className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Manajemen Popup Iklan</h1>
                <p className="text-indigo-100 mt-1">
                  <span>{popups.length} popup tersedia</span>
                </p>
              </div>
            </div>
          </div>
          {canEdit && (
            <button
              onClick={openAddModal}
              className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-700 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Tambah Popup</span>
            </button>
          )}
        </div>
      </div>

      {/* Popups List */}
      {popups.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-16 text-center border border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Belum ada popup</h3>
          <p className="text-gray-600 mb-8 text-lg">Mulai dengan membuat popup pertama Anda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {popups.map((popup, index) => (
            <div
              key={popup.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-900">{popup.title}</h3>
                      {popup.isActive ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md">
                          <Eye size={12} className="mr-1" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-gray-200 text-gray-600">
                          <EyeOff size={12} className="mr-1" />
                          Non-Aktif
                        </span>
                      )}
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                        popup.type === 'IMAGE'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {popup.type === 'IMAGE' ? (
                          <>
                            <ImageIcon size={12} className="mr-1" />
                            Gambar
                          </>
                        ) : (
                          <>
                            <Code size={12} className="mr-1" />
                            HTML
                          </>
                        )}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Type:</strong> {popup.type}</p>
                      <p><strong>Delay:</strong> {popup.delay} detik</p>
                      <p><strong>Show Close:</strong> {popup.showClose ? 'Ya' : 'Tidak'}</p>
                      {popup.width && <p><strong>Ukuran:</strong> {popup.width} × {popup.height}px</p>}
                      {popup.link && (
                        <p className="truncate"><strong>Link:</strong> {popup.link}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        Dibuat oleh: {popup.creator?.name} • {new Date(popup.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {canEdit && (
                      <>
                        <button
                          onClick={() => handleToggleActive(popup)}
                          className={`p-2.5 rounded-xl transition-all group/btn ${
                            popup.isActive
                              ? 'bg-green-50 text-green-700 hover:bg-green-100'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                          }`}
                          title={popup.isActive ? 'Non-aktifkan' : 'Aktifkan'}
                        >
                          {popup.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                        </button>
                        <button
                          onClick={() => handleEdit(popup)}
                          className="p-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all group/btn"
                          title="Edit"
                        >
                          <Edit size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => handleDelete(popup.id)}
                        className="p-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all group/btn"
                        title="Hapus"
                      >
                        <Trash2 size={16} className="group-hover/btn:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPopup ? 'Edit Popup' : 'Tambah Popup Baru'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Popup</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Contoh: Promo Spesial"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Popup</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    setFormData({ ...formData, type: e.target.value as 'IMAGE' | 'HTML' });
                    setImagePreview('');
                    setUploadError('');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="IMAGE">Gambar</option>
                  <option value="HTML">HTML Content</option>
                </select>
              </div>

              {formData.type === 'IMAGE' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Popup</label>

                  {/* Upload Zone or Preview */}
                  {imagePreview ? (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <label className="cursor-pointer px-4 py-2 bg-white rounded-lg font-medium hover:bg-gray-100">
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
                          onClick={handleRemoveImage}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                        isDragging
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        Drag & drop gambar atau klik untuk upload
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF (Maksimal 5MB)
                      </p>
                    </div>
                  )}

                  {uploadError && (
                    <p className="text-red-600 text-sm mt-2">{uploadError}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HTML Content</label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm"
                    placeholder="<div>HTML content here...</div>"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link Tujuan (Opsional)</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="https://example.com/promo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delay (detik)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.delay}
                    onChange={(e) => setFormData({ ...formData, delay: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Berapa detik setelah load halaman</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lebar (px) - Opsional</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.width}
                    onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="Otomatis"
                  />
                  <p className="text-xs text-gray-500 mt-1">Kosongkan untuk ukuran otomatis</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tinggi (px) - Opsional</label>
                  <input
                    type="number"
                    min="100"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="Otomatis"
                  />
                  <p className="text-xs text-gray-500 mt-1">Kosongkan untuk ukuran otomatis</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Aktifkan popup ini</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showClose}
                    onChange={(e) => setFormData({ ...formData, showClose: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Tampilkan tombol close</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  {editingPopup ? 'Update Popup' : 'Buat Popup'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
