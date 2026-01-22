import { notFound } from 'next/navigation';
import { SERVICES } from '@/data/constants';
import { generateServiceMetadata } from '@/lib/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import JsonLd from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';
import { 
  ArrowLeft, 
  Cable, 
  Satellite, 
  Network, 
  Shield, 
  Tv, 
  Wifi, 
  Radio, 
  Link as LinkIcon,
  Settings,
  CheckCircle,
  Zap,
  Boxes,
  Rocket,
  Phone
} from 'lucide-react';
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

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return {
      title: 'Layanan Tidak Ditemukan - AJNUSA',
    };
  }

  return generateServiceMetadata({
    title: service.title,
    description: service.shortDescription,
    id: service.id,
    type: 'layanan',
    category: service.technology,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap] || Cable;

  // Generate structured data
  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.shortDescription,
    id: service.id,
    type: 'layanan',
    category: service.technology,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Layanan', url: `${SITE_URL}/#services` },
    { name: service.title, url: `${SITE_URL}/layanan/${service.id}` },
  ]);

  return (
    <div>
      <JsonLd id="service" {...serviceSchema} />
      <JsonLd id="breadcrumb" {...breadcrumbSchema} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-red-600 via-red-700 to-red-800 py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/#services"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Kembali ke Layanan</span>
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon size={40} className="text-white" />
              </div>
              {service.technology && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                  {service.technology}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Description Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Tentang Layanan Ini
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {service.fullDescription}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Specifications */}
            {service.specifications && service.specifications.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                    <Settings size={24} className="text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Spesifikasi Teknis
                  </h3>
                </div>
                <ul className="space-y-4">
                  {service.specifications.map((spec, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full shrink-0 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                    <Zap size={24} className="text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Fitur Utama
                  </h3>
                </div>
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-pink-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <CheckCircle size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Keuntungan
                  </h3>
                </div>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Equipment */}
            {service.equipment && service.equipment.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Boxes size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Perangkat
                  </h3>
                </div>
                <ul className="space-y-4">
                  {service.equipment.map((equip, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-2"></div>
                      <span className="text-gray-700 dark:text-gray-300">{equip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Implementation */}
          {service.implementation && service.implementation.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Rocket size={24} className="text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contoh Implementasi
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {service.implementation.map((impl, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium"
                  >
                    {impl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-linear-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Tertarik dengan Layanan {service.title}?
              </h3>
              <p className="text-white/90 text-lg mb-8">
                Dapatkan konsultasi gratis dan penawaran terbaik dari tim ahli kami. 
                Kami siap membantu Anda menemukan solusi yang tepat untuk kebutuhan bisnis Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Phone size={20} />
                  <span>Hubungi Kami</span>
                </Link>
                
                <a
                  href={`https://wa.me/6281315474123?text=Halo%20AJNUSA%2C%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
