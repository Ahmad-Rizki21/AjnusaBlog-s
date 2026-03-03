'use client';

import { Building2 } from 'lucide-react';
import { PARTNERS } from '@/data/constants';
import { useRef, useCallback } from 'react';

function PartnerCard({ partner }: { partner: { id: string; name: string; logo: string } }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    // Calculate shine position
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.setProperty('--shine-x', `${shineX}%`);
    card.style.setProperty('--shine-y', `${shineY}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--shine-x', '50%');
    card.style.setProperty('--shine-y', '50%');
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="partner-card bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center aspect-video border border-gray-200 dark:border-gray-700 group overflow-hidden relative"
      style={{
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      } as React.CSSProperties}
    >
      {/* Shine overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(220, 38, 38, 0.08) 0%, transparent 60%)',
        }}
      />
      
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(220,38,38,0.2)]"
        style={{ transform: 'translateZ(20px)' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <Building2
        size={40}
        className="text-gray-400 group-hover:text-red-500 transition-colors hidden"
        style={{ transform: 'translateZ(20px)' }}
      />
    </div>
  );
}

export default function Partners() {
  return (
    <section id="clients" className="py-20 bg-gray-50 dark:bg-gray-900">
      <style jsx global>{`
        .partner-card {
          --shine-x: 50%;
          --shine-y: 50%;
        }
        .partner-card:hover {
          box-shadow: 0 20px 40px -12px rgba(220, 38, 38, 0.15),
                      0 8px 16px -8px rgba(0, 0, 0, 0.1);
          border-color: rgba(220, 38, 38, 0.3) !important;
        }

        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .partner-card {
          animation: float-in 0.6s ease-out backwards;
        }
        .partner-card:nth-child(1) { animation-delay: 0.05s; }
        .partner-card:nth-child(2) { animation-delay: 0.1s; }
        .partner-card:nth-child(3) { animation-delay: 0.15s; }
        .partner-card:nth-child(4) { animation-delay: 0.2s; }
        .partner-card:nth-child(5) { animation-delay: 0.25s; }
        .partner-card:nth-child(6) { animation-delay: 0.3s; }
        .partner-card:nth-child(7) { animation-delay: 0.35s; }
        .partner-card:nth-child(8) { animation-delay: 0.4s; }
      `}</style>

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
            <PartnerCard key={partner.id} partner={partner} />
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
