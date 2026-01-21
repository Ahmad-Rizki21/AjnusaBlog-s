'use client';

import { Award, Users, Target, Eye, Rocket } from 'lucide-react';
import { COMPANY_INFO } from '@/data/constants';

const stats = [
  { icon: Award, label: 'Pengalaman', value: '20+ Tahun' },
  { icon: Users, label: 'Tim Profesional', value: 'Expert' },
  { icon: Target, label: 'Implementasi HUB', value: 'Tersebar' },
  { icon: Target, label: 'SLA', value: '99.9%' },
];

const values = [
  {
    icon: Eye,
    title: 'Visi Kami',
    description: 'Menjadi Perusahaan Network Infrastructure Solution And Services Yang Mempunyai Implementasi HUB Yang Tersebar Dan Terintegrasi Dengan Performance Optimal, Dan Terpercaya.',
  },
  {
    icon: Rocket,
    title: 'Misi Kami',
    items: [
      'Memberikan Solusi System yang terintegrasi dengan perencanaan dan strategi bisnis Customer',
      'Senantiasa meningkatkan pelayanan, baik kepada Customer dan Internal, dengan meningkatkan Service Level Agreement, sistem prosedur operasional, tingkat akurasi dan keamanan data',
      'Senantiasa meningkatkan kualitas sumber daya manusia dari sisi Team Work, pengetahuan, kemampuan teknis, dan tanggung jawab moral',
      'Ikut aktif terciptanya efisiensi di segala bidang dengan penerapan teknologi informasi dan komunikasi',
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full mb-6">
            <span className="text-red-700 dark:text-red-400 text-sm font-medium">
              Siapa Kami
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {COMPANY_INFO.fullName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Didirikan oleh para profesional di bidangnya masing-masing dengan SDM berpengalaman
            di bidang Satellite Communications selama hampir 20 tahun.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left - About Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Solusi ICT Terpercaya
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {COMPANY_INFO.fullName} menyediakan solusi ICT (Information Communication Technology),
                terutama dengan media satelit. Satelit menjadi pilihan media ICT dengan pertimbangan
                kondisi geografis Indonesia yang luas dan terdiri dari pulau-pulau serta dipisahkan
                oleh laut dan pegunungan.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kami berkomitmen terhadap layanan yang kami berikan untuk mendukung kebutuhan
                konektivitas dan komunikasi di seluruh wilayah Indonesia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 4).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Vision & Mission */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-red-50 dark:bg-gray-800 rounded-2xl p-6 border border-red-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center shrink-0">
                    <value.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                  </div>
                </div>

                {value.description ? (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-16">
                    {value.description}
                  </p>
                ) : (
                  <ul className="space-y-3 pl-16">
                    {value.items?.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-3 text-gray-700 dark:text-gray-300 text-sm"
                      >
                        <div className="w-2 h-2 bg-red-600 rounded-full shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-red-700 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Komitmen Kami
          </h3>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
            Memberikan solusi konektivitas terbaik dengan implementasi HUB yang tersebar dan
            terintegrasi dengan performance optimal untuk mendukung pertumbuhan bisnis Anda
            di seluruh Indonesia.
          </p>
        </div>
      </div>
    </section>
  );
}
