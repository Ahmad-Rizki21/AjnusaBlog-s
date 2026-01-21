'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { COMPANY_INFO } from '@/data/constants';
import { Megaphone, Image as ImageIcon, Code, ExternalLink, Calendar, X } from 'lucide-react';

interface Popup {
  id: string;
  title: string;
  type: 'IMAGE' | 'HTML';
  content: string;
  link: string | null;
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

export default function PromosiPage() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPopup, setSelectedPopup] = useState<Popup | null>(null);
  const [showModal, setShowModal] = useState(false);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    try {
      const response = await fetch('/api/popups');
      const data = await response.json();
      setPopups(data);
    } catch (error) {
      console.error('Error fetching popups:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get popups to display
  const displayedPopups = popups.slice(0, visibleCount);
  const hasMore = visibleCount < popups.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + postsPerPage);
  };

  const handlePopupClick = (popup: Popup) => {
    if (popup.link) {
      window.open(popup.link, '_blank');
    } else {
      // Show detail modal for popups without link
      setSelectedPopup(popup);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPopup(null);
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
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 min-h-[400px] flex items-center pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Promosi {COMPANY_INFO.name}
              </h1>
              <p className="text-lg text-white/90">
                Dapatkan penawaran terbaik dan promo menarik untuk solusi internet
                dan IT bisnis Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Popup Cards */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {displayedPopups.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedPopups.map((popup) => (
                    <div
                      key={popup.id}
                      className="bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                      {/* Popup Content Preview */}
                      <div
                        className="relative h-64 overflow-hidden cursor-pointer"
                        onClick={() => handlePopupClick(popup)}
                      >
                        {popup.type === 'IMAGE' ? (
                          <img
                            src={popup.content}
                            alt={popup.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-950 flex items-center justify-center">
                            <Code className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                          </div>
                        )}
                        {/* Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold ${
                            popup.type === 'IMAGE'
                              ? 'bg-blue-600 text-white'
                              : 'bg-purple-600 text-white'
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
                        {/* Link Badge */}
                        {popup.link && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-white/90 dark:bg-black/70 text-gray-800 dark:text-white">
                              <ExternalLink size={12} className="mr-1" />
                              Link
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {popup.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(popup.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}</span>
                          </div>
                          {popup.delay > 0 && (
                            <span>• Delay: {popup.delay}s</span>
                          )}
                        </div>

                        {/* Action Button */}
                        {popup.link ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePopupClick(popup);
                            }}
                            className="w-full px-4 py-2.5 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <span>Lihat Promo</span>
                            <ExternalLink size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePopupClick(popup);
                            }}
                            className="w-full px-4 py-2.5 bg-red-700 text-white font-medium rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <span>Lihat Detail</span>
                            <Megaphone size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    >
                      Muat Lebih Banyak Promo ({popups.length - visibleCount} lagi)
                    </button>
                  </div>
                )}

                {/* End of list message */}
                {!hasMore && displayedPopups.length > 0 && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      {displayedPopups.length === popups.length && popups.length > 6
                        ? `Semua ${popups.length} promo telah ditampilkan`
                        : 'Tidak ada promo lainnya'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Belum ada promo aktif
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Promo akan segera tersedia. Kembali lagi nanti!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Butuh Penawaran Khusus untuk Bisnis Anda?
              </h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Konsultasikan kebutuhan internet dan IT Anda dengan tim ahli kami.
                Kami siap memberikan penawaran terbaik untuk bisnis Anda.
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

        {/* Popup Detail Modal */}
        {showModal && selectedPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-red-600 to-red-700">
                <h2 className="text-2xl font-bold text-white">{selectedPopup.title}</h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                {selectedPopup.type === 'IMAGE' ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedPopup.content}
                      alt={selectedPopup.title}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPopup.content }}
                  />
                )}

                {/* Meta Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(selectedPopup.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}</span>
                    </div>
                  </div>

                  {selectedPopup.link && (
                    <button
                      onClick={() => window.open(selectedPopup.link!, '_blank')}
                      className="mt-4 w-full px-6 py-3 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Kunjungi Link Promo</span>
                      <ExternalLink size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
