'use client';

import { useState } from 'react';
import {
  Cable,
  Satellite,
  Network,
  Shield,
  Tv,
  Wifi,
  Radio,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Settings,
  CheckCircle,
  Zap,
  Boxes,
  Rocket,
} from 'lucide-react';
import { SERVICES } from '@/data/constants';
import Link from 'next/link';

const iconMap = {
  cable: Cable,
  satellite: Satellite,
  network: Network,
  shield: Shield,
  tv: Tv,
  wifi: Wifi,
  radio: Radio,
  link: LinkIcon,
};

export default function Services() {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  const toggleMobileService = (id: string) => {
    setExpandedMobileId(expandedMobileId === id ? null : id);
  };

  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];
  const ActiveIcon = iconMap[activeService.icon as keyof typeof iconMap] || Cable;

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-4">
            <span className="text-red-700 dark:text-red-400 text-sm font-medium">
              Layanan Kami
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Solusi Konektivitas Terlengkap
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Layanan VSAT dan solusi ICT dari Artacom untuk mendukung kebutuhan
            komunikasi bisnis Anda di seluruh Indonesia.
          </p>
        </div>

        {/* Desktop View: Master-Detail Layout */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          {/* Sidebar Menu */}
          <div className="col-span-4 space-y-4">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Cable;
              const isActive = activeId === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border group ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 border-red-500 shadow-lg scale-105 ring-1 ring-red-500'
                      : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-red-700 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 group-hover:text-red-700 dark:group-hover:text-red-400'
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3
                        className={`font-bold transition-colors ${
                          isActive
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl h-full relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 dark:bg-red-900/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>

              <div className="relative z-10 animate-fade-in">
                {/* Header */}
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-20 h-20 bg-red-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <ActiveIcon size={40} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {activeService.title}
                    </h3>
                    {activeService.technology && (
                      <span className="inline-block px-4 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full mb-3">
                        {activeService.technology}
                      </span>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {activeService.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Specifications */}
                  {activeService.specifications && activeService.specifications.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Settings size={20} className="text-red-600 dark:text-red-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          Spesifikasi
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeService.specifications.map((spec, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0 mt-2"></div>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Features */}
                  {activeService.features && activeService.features.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                          <Zap size={20} className="text-pink-600 dark:text-pink-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          Fitur Utama
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle size={16} className="text-pink-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {activeService.benefits && activeService.benefits.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          Keuntungan
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Equipment */}
                  {activeService.equipment && activeService.equipment.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Boxes size={20} className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          Perangkat
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {activeService.equipment.map((equip, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                            <span>{equip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                 {/* Implementation */}
                  {activeService.implementation && activeService.implementation.length > 0 && (
                     <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <Rocket size={20} className="text-orange-600 dark:text-orange-400" />
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                             Contoh Implementasi
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {activeService.implementation.map((impl, idx) => (
                             <span
                               key={idx}
                               className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-sm"
                             >
                               {impl}
                             </span>
                           ))}
                        </div>
                     </div>
                  )}

                <div className="mt-8 flex justify-end">
                  <Link
                    href="#contact"
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-red-700 text-white font-bold rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Ajukan Konsultasi</span>
                    <LinkIcon size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: Accordion Layout (Existing) */}
        <div className="lg:hidden space-y-6 max-w-5xl mx-auto">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Cable;
            const isExpanded = expandedMobileId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Service Header */}
                <button
                  onClick={() => toggleMobileService(service.id)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-14 h-14 bg-red-700 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronUp size={24} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 mb-6 text-sm">
                      {service.fullDescription}
                    </p>
                    
                     {/* Simplified Details for Mobile */}
                     <div className="space-y-4">
                        {service.features && service.features.length > 0 && (
                           <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm flex items-center space-x-2">
                                 <Zap size={16} className="text-pink-500"/>
                                 <span>Fitur Utama</span>
                              </h4>
                               <ul className="space-y-2">
                                  {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                                      <CheckCircle size={14} className="text-pink-500 shrink-0 mt-0.5" />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                               </ul>
                           </div>
                        )}
                         <div className="pt-4">
                             <Link
                             href="#contact"
                             className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold rounded-xl hover:bg-red-200 transition-colors"
                           >
                              <span>Pelajari Lebih Lanjut</span>
                              <LinkIcon size={16} />
                           </Link>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-red-700 text-white font-semibold rounded-full hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Konsultasi Gratis</span>
            <LinkIcon size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
