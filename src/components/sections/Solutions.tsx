'use client';

import { ArrowRight, Building2, GraduationCap, Landmark, Ship, Building, Store } from 'lucide-react';
import { SOLUTIONS } from '@/data/constants';
import Image from 'next/image';
import Link from 'next/link';

const categoryIcons = {
  Business: Building2,
  Education: GraduationCap,
  Government: Landmark,
  'Maritim & Shipping': Ship,
  Banking: Building,
  retail: Store,
};

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <span className="text-red-700 dark:text-red-400 text-sm font-medium">
              Solusi Kami
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Solusi Internet Berbagai Industri
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Kami menyediakan solusi konektivitas yang disesuaikan untuk berbagai sektor
            industri dengan coverage seluruh Indonesia.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS.map((solution, index) => {
            const Icon = categoryIcons[solution.category as keyof typeof categoryIcons] || Building2;

            return (
              <div
                key={solution.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
                      {solution.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {solution.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Link */}
                  <Link
                    href={`/solusi/${solution.id}`}
                    className="inline-flex items-center space-x-2 text-red-700 dark:text-red-400 font-medium text-sm group-hover:space-x-3 transition-all"
                  >
                    <span>Pelajari Lebih Lanjut</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg">
            <span className="text-gray-700 dark:text-gray-300">Butuh solusi khusus?</span>
            <Link
              href="#contact"
              className="text-red-700 dark:text-red-400 font-semibold hover:underline"
            >
              Konsultasi Gratis →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
