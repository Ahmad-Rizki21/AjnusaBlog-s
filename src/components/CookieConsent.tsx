'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    setIsLoading(true);
    localStorage.setItem('cookieConsent', 'accepted');
    setTimeout(() => {
      setShowBanner(false);
      setIsLoading(false);
    }, 300);
  };

  const handleReject = () => {
    setIsLoading(true);
    localStorage.setItem('cookieConsent', 'rejected');
    setTimeout(() => {
      setShowBanner(false);
      setIsLoading(false);
    }, 300);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-9998"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-9999 p-4 md:p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-100 animate-slideUp">
          {/* Decorative top border */}
          <div className="h-2 bg-linear-to-r from-purple-600 via-red-600 to-purple-600"></div>
          
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Kami menjaga informasi pribadi Anda
            </h2>
            
            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
              Website ini menggunakan cookie untuk memberikan pengalaman terbaik, 
              mengumpulkan data tentang interaksi Anda dengan situs dan layanan 
              kami, dan untuk keperluan pemasaran. Dengan klik tombol Izinkan, Anda 
              menyetujui penggunaan semua cookie di perangkat Anda untuk keperluan 
              iklan, personalisasi, dan analisis seperti yang disebutkan di{' '}
              <a 
                href="/kebijakan-cookie" 
                className="text-red-600 font-semibold underline hover:text-red-700 transition-colors"
              >
                Kebijakan Cookie kami
              </a>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                disabled={isLoading}
                className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Izinkan'
                )}
              </button>
              
              <button
                onClick={handleReject}
                disabled={isLoading}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </>
  );
}
