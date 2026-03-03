import { notFound } from 'next/navigation';
import { SOLUTIONS } from '@/data/constants';
import { generateServiceMetadata } from '@/lib/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';
import { ArrowLeft, Building2, GraduationCap, Landmark, Ship, Building, Store, CheckCircle, Globe, Shield, Zap, Phone, MessageCircle, Users, Target } from 'lucide-react';
import Link from 'next/link';

const categoryIcons = {
  Business: Building2,
  Education: GraduationCap,
  Government: Landmark,
  'Maritim & Shipping': Ship,
  Banking: Building,
  retail: Store,
};

// Category-specific detail content
const SOLUTION_DETAILS: Record<string, { targetAudience: string[]; highlights: { label: string; value: string }[] }> = {
  Business: {
    targetAudience: ['Perusahaan Swasta', 'Startup & Scale-up', 'Kantor Cabang', 'Co-working Space'],
    highlights: [
      { label: 'Bandwidth', value: 'Up to 100 Mbps' },
      { label: 'Teknologi', value: 'Fiber & VSAT' },
      { label: 'Kontrak', value: 'Fleksibel' },
    ],
  },
  Education: {
    targetAudience: ['Universitas & Sekolah', 'Lembaga Pelatihan', 'E-Learning Platform', 'Perpustakaan Digital'],
    highlights: [
      { label: 'Content Filter', value: 'Tersedia' },
      { label: 'User', value: 'Multi-user' },
      { label: 'Bandwidth', value: 'Managed' },
    ],
  },
  Government: {
    targetAudience: ['Kementerian', 'Pemerintah Daerah', 'BUMN / BUMD', 'Instansi Militer'],
    highlights: [
      { label: 'Keamanan', value: 'Enkripsi E2E' },
      { label: 'Compliance', value: 'Standar Pemerintah' },
      { label: 'Coverage', value: 'Nasional' },
    ],
  },
  'Maritim & Shipping': {
    targetAudience: ['Perusahaan Pelayaran', 'Offshore Platform', 'Kapal Kargo', 'Pelabuhan'],
    highlights: [
      { label: 'Teknologi', value: 'VSAT Maritime' },
      { label: 'Coverage', value: 'Perairan RI' },
      { label: 'Stabilitas', value: 'Anti-gangguan' },
    ],
  },
  Banking: {
    targetAudience: ['Bank Umum', 'BPR / BPD', 'Fintech', 'Lembaga Keuangan'],
    highlights: [
      { label: 'Latency', value: 'Ultra-low' },
      { label: 'Redundancy', value: 'Dual-link' },
      { label: 'Compliance', value: 'OJK Ready' },
    ],
  },
  retail: {
    targetAudience: ['Supermarket & Minimarket', 'Restoran & F&B', 'Fashion Retail', 'Franchise'],
    highlights: [
      { label: 'POS Support', value: 'Tersedia' },
      { label: 'Multi-cabang', value: 'Terpusat' },
      { label: 'Biaya', value: 'Efisien' },
    ],
  },
};

// Feature data for each solution detail
const FEATURES = [
  {
    icon: Globe,
    title: 'Jangkauan Luas',
    description: 'Solusi kami menjangkau seluruh Indonesia dengan infrastruktur VSAT yang andal, memastikan konektivitas stabil di berbagai lokasi termasuk daerah terpencil.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Shield,
    title: 'Keamanan Tinggi',
    description: 'Dilengkapi dengan enkripsi end-to-end dan sistem keamanan berlapis untuk melindungi data sensitif perusahaan Anda dari ancaman cyber.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Zap,
    title: 'Performa Optimal',
    description: 'Bandwidth dedicated dengan SLA 99.9% uptime memastikan operasional bisnis Anda berjalan lancar tanpa gangguan.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: CheckCircle,
    title: 'Dukungan 24/7',
    description: 'Tim teknis kami siap membantu Anda kapan saja dengan respons cepat dan solusi yang efektif untuk setiap kendala yang muncul.',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
];

const BENEFITS_LEFT = [
  'Konektivitas stabil di seluruh lokasi',
  'Implementasi cepat dan mudah',
  'Monitoring real-time 24/7',
  'Compliance dengan standar industri',
];

const BENEFITS_RIGHT = [
  'Bandwidth scalable sesuai kebutuhan',
  'Cost-effective untuk jangka panjang',
  'Backup connection untuk redundancy',
  'Dedicated account manager',
];

export async function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({
    id: solution.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = SOLUTIONS.find((s) => s.id === id);

  if (!solution) {
    return {
      title: 'Solusi Tidak Ditemukan - AJNUSA',
    };
  }

  return generateServiceMetadata({
    title: solution.title,
    description: solution.description,
    id: solution.id,
    type: 'solusi',
    category: solution.category,
    image: solution.image,
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = SOLUTIONS.find((s) => s.id === id);

  if (!solution) {
    notFound();
  }

  const Icon = categoryIcons[solution.category as keyof typeof categoryIcons] || Building2;

  // Generate structured data
  const serviceSchema = generateServiceSchema({
    name: solution.title,
    description: solution.description,
    id: solution.id,
    type: 'solusi',
    category: solution.category,
    image: solution.image,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Solusi', url: `${SITE_URL}/#solutions` },
    { name: solution.title, url: `${SITE_URL}/solusi/${solution.id}` },
  ]);

  return (
    <div>
      <JsonLd id="solution" {...serviceSchema} />
      <JsonLd id="breadcrumb" {...breadcrumbSchema} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={solution.image}
            alt={solution.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/#solutions"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Kembali ke Solusi</span>
              </Link>
              
              <div className="max-w-4xl">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <Icon size={16} className="text-white" />
                  <span className="text-white text-sm font-medium">{solution.category}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {solution.title}
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  {solution.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Two-Column: Overview + Sidebar */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Overview - Left 2 Columns */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-red-700 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Tentang Solusi Ini
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Dirancang khusus untuk {solution.category}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
                  {solution.description}
                </p>

                {/* Cocok Untuk */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="text-red-700 dark:text-red-400" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Cocok Untuk</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(SOLUTION_DETAILS[solution.category]?.targetAudience || []).map((audience, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-lg border border-red-100 dark:border-red-800/30"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlight Layanan */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={18} className="text-red-700 dark:text-red-400" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Highlight Layanan</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(SOLUTION_DETAILS[solution.category]?.highlights || []).map((item, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">99.9%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">SLA Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">24/7</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Support</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-red-700 dark:text-red-400">100+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Klien Aktif</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right 1 Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              {/* Quick Contact Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Tertarik dengan solusi ini?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  Hubungi tim kami untuk konsultasi gratis dan penawaran terbaik.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-red-700 text-white font-semibold rounded-xl hover:bg-red-800 transition-colors"
                  >
                    <Phone size={18} />
                    Hubungi Kami
                  </Link>
                  <a
                    href="https://wa.me/6281315474123?text=Halo%20AJNUSA%2C%20saya%20tertarik%20dengan%20solusi%20untuk%20industri%20saya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    Chat WhatsApp
                  </a>
                </div>
              </div>

              {/* Related Solutions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Solusi Lainnya
                </h3>
                <div className="flex flex-col gap-3">
                  {SOLUTIONS.filter(s => s.id !== solution.id).slice(0, 3).map((related) => {
                    const RelatedIcon = categoryIcons[related.category as keyof typeof categoryIcons] || Building2;
                    return (
                      <Link
                        key={related.id}
                        href={`/solusi/${related.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                          <RelatedIcon size={18} className="text-red-700 dark:text-red-400" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {related.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {related.category}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid - 2x2 layout */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Keunggulan Solusi Kami
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <FeatureIcon size={24} className={feature.color} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits Section - Two columns with image */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Image Side */}
            <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-auto">
              <img
                src={solution.image}
                alt={`${solution.title} benefits`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={40} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-xl">{solution.title}</p>
                  <p className="text-white/80 text-sm mt-1">{solution.category}</p>
                </div>
              </div>
            </div>

            {/* Benefits List Side */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Keuntungan Menggunakan Solusi Ini
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                {[...BENEFITS_LEFT, ...BENEFITS_RIGHT].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={14} className="text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-red-700 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Siap Memulai?
                </h3>
                <p className="text-white/90 text-lg max-w-xl">
                  Hubungi tim kami untuk mendapatkan konsultasi gratis dan penawaran terbaik 
                  yang disesuaikan dengan kebutuhan bisnis Anda.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Hubungi Kami
                </Link>
                
                <a
                  href="https://wa.me/6281315474123?text=Halo%20AJNUSA%2C%20saya%20tertarik%20dengan%20solusi%20untuk%20industri%20saya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
