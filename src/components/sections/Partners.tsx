'use client';

import { Building2 } from 'lucide-react';
import { PARTNERS } from '@/data/constants';
import Image from 'next/image';

export default function Partners() {
  return (
    <section id="clients" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <span className="text-red-700 dark:text-red-400 text-sm font-medium">
              Klien Kami
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dipercaya oleh Berbagai Perusahaan
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Kami bangga dapat bekerja sama dengan berbagai perusahaan dari
            berbagai industri di seluruh Indonesia.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center aspect-video border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 group overflow-hidden"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Building2
                size={40}
                className="text-gray-400 group-hover:text-red-500 transition-colors hidden"
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-red-700 rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ingin Menjadi Klien Kami?
          </h3>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan perusahaan yang telah mempercayakan
            kebutuhan internet dan IT kepada kami.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-md"
          >
            <span>Hubungi Kami</span>
          </a>
        </div>
      </div>
    </section>
  );
}
