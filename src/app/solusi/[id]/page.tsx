import { notFound } from 'next/navigation';
import { SOLUTIONS } from '@/data/constants';
import { ArrowLeft, Building2, GraduationCap, Landmark, Ship, Building, Store, CheckCircle, Globe, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const categoryIcons = {
  Business: Building2,
  Education: GraduationCap,
  Government: Landmark,
  'Maritim & Shipping': Ship,
  Banking: Building,
  retail: Store,
};

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

  return {
    title: `${solution.title} - AJNUSA`,
    description: solution.description,
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const solution = SOLUTIONS.find((s) => s.id === id);

  if (!solution) {
    notFound();
  }

  const Icon = categoryIcons[solution.category as keyof typeof categoryIcons] || Building2;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={solution.image}
          alt={solution.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-black/30"></div>
        
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
              
              <p className="text-xl text-white/90 leading-relaxed">
                {solution.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl mb-12">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center">
                <Icon size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Tentang Solusi Ini
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Dirancang khusus untuk {solution.category}
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {solution.description}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Coverage */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Globe size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Jangkauan Luas
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Solusi kami menjangkau seluruh Indonesia dengan infrastruktur VSAT yang andal, 
                memastikan konektivitas stabil di berbagai lokasi termasuk daerah terpencil.
              </p>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Shield size={24} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Keamanan Tinggi
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Dilengkapi dengan enkripsi end-to-end dan sistem keamanan berlapis untuk 
                melindungi data sensitif perusahaan Anda dari ancaman cyber.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Zap size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Performa Optimal
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Bandwidth dedicated dengan SLA 99.9% uptime memastikan operasional bisnis 
                Anda berjalan lancar tanpa gangguan.
              </p>
            </div>

            {/* Support */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <CheckCircle size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dukungan 24/7
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tim teknis kami siap membantu Anda kapan saja dengan respons cepat dan 
                solusi yang efektif untuk setiap kendala yang muncul.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-linear-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Keuntungan Menggunakan Solusi Ini
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Konektivitas stabil di seluruh lokasi',
                'Bandwidth scalable sesuai kebutuhan',
                'Implementasi cepat dan mudah',
                'Cost-effective untuk jangka panjang',
                'Monitoring real-time 24/7',
                'Backup connection untuk redundancy',
                'Compliance dengan standar industri',
                'Dedicated account manager',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-linear-to-r from-red-600 to-red-700 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Tertarik dengan Solusi Ini?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Hubungi tim kami untuk mendapatkan konsultasi gratis dan penawaran terbaik 
              yang disesuaikan dengan kebutuhan bisnis Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Hubungi Kami
              </Link>
              
              <a
                href="https://wa.me/6281315474123?text=Halo%20AJNUSA%2C%20saya%20tertarik%20dengan%20solusi%20untuk%20industri%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
  );
}
