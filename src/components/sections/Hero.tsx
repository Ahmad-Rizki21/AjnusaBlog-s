'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, HeadphonesIcon } from 'lucide-react';
import { COMPANY_INFO } from '@/data/constants';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-red-700">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Zap size={16} className="text-red-200" />
            <span className="text-white text-sm font-medium">
              Internet Cepat & Stabil sejak {COMPANY_INFO.since}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {COMPANY_INFO.tagline}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Solusi internet fiber optik, VSAT, SD-WAN terbaik untuk mendukung bisnis Anda.
            Juga melayani pembuatan website dan aplikasi mobile.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="#contact"
              className="group px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 flex items-center space-x-2 transform hover:-translate-y-1"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="#services"
              className="px-8 py-4 bg-transparent border-2 border-white/80 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Lihat Layanan
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-red-100" />
              </div>
              <h3 className="text-white font-semibold mb-2">Kecepatan Tinggi</h3>
              <p className="text-white/80 text-sm">
                Hingga 10 Gbps dengan teknologi fiber optik terbaru
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-red-100" />
              </div>
              <h3 className="text-white font-semibold mb-2">SLA 99.9%</h3>
              <p className="text-white/80 text-sm">
                Jaminan uptime dan keandalan koneksi
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors duration-300">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon size={24} className="text-red-100" />
              </div>
              <h3 className="text-white font-semibold mb-2">24/7 Support</h3>
              <p className="text-white/80 text-sm">
                Tim technical support siap membantu kapanpun
              </p>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
