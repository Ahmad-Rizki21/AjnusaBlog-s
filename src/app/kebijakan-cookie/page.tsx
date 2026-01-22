import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Cookie - AJNUSA',
  description: 'Kebijakan penggunaan cookie di website AJNUSA',
};

export default function KebijakanCookiePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-red-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Kebijakan Cookie
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Apa itu Cookie?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookie adalah file teks kecil yang ditempatkan di perangkat Anda saat Anda 
                mengunjungi website kami. Cookie membantu kami menyediakan pengalaman yang 
                lebih baik dan relevan untuk Anda.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bagaimana Kami Menggunakan Cookie?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kami menggunakan cookie untuk berbagai tujuan, termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Mengingat preferensi dan pengaturan Anda</li>
                <li>Memahami bagaimana Anda menggunakan website kami</li>
                <li>Meningkatkan kinerja dan fungsionalitas website</li>
                <li>Menyediakan konten yang dipersonalisasi</li>
                <li>Menganalisis traffic dan penggunaan website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Jenis Cookie yang Kami Gunakan
              </h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-900 mb-2">
                    Cookie Esensial
                  </h3>
                  <p className="text-gray-700">
                    Cookie ini diperlukan untuk fungsi dasar website dan tidak dapat 
                    dinonaktifkan. Mereka biasanya hanya diatur sebagai respons terhadap 
                    tindakan Anda seperti pengaturan preferensi privasi atau login.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    Cookie Analitik
                  </h3>
                  <p className="text-gray-700">
                    Cookie ini membantu kami memahami bagaimana pengunjung berinteraksi 
                    dengan website kami dengan mengumpulkan dan melaporkan informasi secara 
                    anonim.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">
                    Cookie Pemasaran
                  </h3>
                  <p className="text-gray-700">
                    Cookie ini digunakan untuk melacak pengunjung di berbagai website. 
                    Tujuannya adalah untuk menampilkan iklan yang relevan dan menarik bagi 
                    pengguna individual.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mengelola Cookie
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Anda dapat mengontrol dan/atau menghapus cookie sesuai keinginan Anda. 
                Anda dapat menghapus semua cookie yang sudah ada di komputer Anda dan 
                mengatur sebagian besar browser untuk mencegah penempatan cookie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Namun, jika Anda melakukan ini, Anda mungkin harus menyesuaikan beberapa 
                preferensi secara manual setiap kali Anda mengunjungi situs dan beberapa 
                layanan dan fungsi mungkin tidak berfungsi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Perubahan Kebijakan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu untuk 
                mencerminkan perubahan dalam praktik kami atau untuk alasan operasional, 
                hukum, atau peraturan lainnya.
              </p>
            </section>

            <section className="bg-linear-to-r from-red-50 to-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Hubungi Kami
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Jika Anda memiliki pertanyaan tentang Kebijakan Cookie kami, silakan 
                hubungi kami:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@ajnusa.com</p>
                <p><strong>Telepon:</strong> +62 813 1547 4123</p>
                <p><strong>Alamat:</strong> [Perkantoran Graha Prima Bintara No 8, Jl Terusan I Gusti Ngurah Rai, 17134]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
