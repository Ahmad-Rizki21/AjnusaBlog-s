'use client';

import { useState, useRef } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  text: string;
  response: string;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    id: 'vsat',
    text: 'Apa itu layanan VSAT?',
    response: 'VSAT (Very Small Aperture Terminal) adalah teknologi komunikasi satelit yang kami tawarkan. Kami menyediakan beberapa jenis layanan VSAT:\n\n📡 Artacom Broadband - Untuk aplikasi TCP/IP dengan banyak remote\n🔗 Artacom Link - Dedicated bandwidth untuk point-to-point\n🌐 Artacom Net - Untuk aplikasi point-to-multipoint\n📱 Artacom VSAT Mobile - Mobile broadband 64 kbps - 2 Mbps\n\nSemua layanan VSAT kami menjangkau seluruh Indonesia! Mau tahu lebih detail tentang layanan mana?'
  },
  {
    id: 'internet',
    text: 'Layanan internet untuk perumahan',
    response: 'Kami punya 2 layanan internet khusus untuk perumahan dan rusun:\n\n🏘️ Jakinet - Khusus untuk warga rusun di DKI Jakarta dengan kecepatan hingga 50 Mbps\n\n🏡 Jelantik - Untuk perumahan dan rusun di seluruh Indonesia dengan kecepatan hingga 70 Mbps\n\nKedua layanan menggunakan teknologi VSAT Broadband yang stabil danandal. Tertarik untuk berlangganan?'
  },
  {
    id: 'corporate',
    text: 'Solusi untuk perusahaan',
    response: 'Kami menyediakan berbagai solusi internet untuk perusahaan:\n\n🏢 Corporate Internet - Internet dedicated dengan support 24/7\n🏦 Banking Solution - Untuk perusahaan perbankan dengan keamanan tinggi\n🛒 Retail Solution - Untuk jaringan toko retail\n🚢 Maritim & Shipping - Untuk perusahaan maritim\n🏛️ Government Solution - Untuk instansi pemerintahan\n🎓 Education Solution - Untuk institusi pendidikan\n\nSemua dilengkapi dengan SLA dan dukungan teknis 24/7. Perusahaan Anda bergerak di bidang apa?'
  },
  {
    id: 'vns',
    text: 'Apa itu Artacom VNS?',
    response: 'Artacom VNS (Virtual Network Service) adalah solusi jaringan privat yang aman untuk perusahaan!\n\n🔒 Keunggulan VNS:\n✅ Jaringan privat yang fleksibel dan aman\n✅ Kecepatan transfer data tinggi\n✅ Enkripsi data untuk keamanan maksimal\n✅ Any-to-Any Connectivity\n✅ Support untuk berbagai kecepatan akses\n✅ Network Monitoring Service\n\nCocok untuk perusahaan dengan banyak cabang yang membutuhkan koneksi aman antar lokasi. Butuh penawaran khusus?'
  },
  {
    id: 'contact',
    text: 'Cara menghubungi AJNUSA',
    response: 'Anda bisa menghubungi kami melalui:\n\n📞 Telepon:\n• +62 813 1547 4123\n• +62 8495 2514\n• (021) 8945 4821\n\n📧 Email: sales@ajnusa.com\n\n📍 Alamat:\nPerkantoran Graha Prima Bintara No 8\nJl Terusan I Gusti Ngurah Rai, 17134\n\n⏰ Jam Kerja:\n• Senin-Jumat: 09.00 - 17.00\n• Dukungan Teknis: 24 Jam\n\nMau saya hubungkan ke tim sales via WhatsApp?'
  },
  {
    id: 'price',
    text: 'Informasi harga dan paket',
    response: 'Untuk informasi harga dan paket yang sesuai dengan kebutuhan Anda, silakan hubungi tim sales kami:\n\n📱 WhatsApp: +62 813 1547 4123\n📧 Email: sales@ajnusa.com\n\nTim kami akan memberikan penawaran terbaik sesuai dengan:\n✅ Lokasi Anda\n✅ Bandwidth yang dibutuhkan\n✅ Jenis layanan yang dipilih\n✅ Jumlah pengguna\n\nKlik tombol di bawah untuk chat langsung dengan tim sales!'
  }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messageIdCounter = useRef(0);

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    const userMessage: Message = {
      id: `msg-${messageIdCounter.current++}`,
      text: reply.text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowQuickReplies(false);

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        text: reply.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage: Message = {
        id: `msg-${messageIdCounter.current++}`,
        text: inputMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');

      // Add bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: `msg-${messageIdCounter.current++}`,
          text: 'Terima kasih atas pertanyaan Anda! Tim kami akan segera menghubungi Anda. Untuk respons lebih cepat, silakan hubungi kami via WhatsApp di +62 813 1547 4123 atau email ke sales@ajnusa.com',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactSales = () => {
    const whatsappNumber = '6281315474123';
    const message = 'Halo AJNUSA, saya tertarik dengan layanan Anda. Mohon informasi lebih lanjut.';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[90vw] max-w-[420px] bg-white rounded-3xl shadow-2xl z-9999 animate-slideUp overflow-hidden flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-linear-to-r from-red-600 to-red-700 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Ajnusa</h3>
                <p className="text-red-100 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-red-800 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-linear-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <>
                {/* Initial Greeting */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                    <svg className="w-10 h-10 text-white transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                      <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
                    </svg>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Halo! 👋</h4>
                  <p className="text-gray-600">Ada yang bisa saya bantu?</p>
                </div>

                {/* Quick Replies */}
                {showQuickReplies && (
                  <div className="space-y-2">
                    {QUICK_REPLIES.map((reply) => (
                      <button
                        key={reply.id}
                        onClick={() => handleQuickReply(reply)}
                        className="w-full text-left p-3 bg-white hover:bg-red-50 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <svg 
                          className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span className="text-gray-700 group-hover:text-gray-900 text-sm">
                          {reply.text}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.isUser
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                  </div>
                ))}
                
                {/* Contact Sales Button after conversation */}
                {messages.length > 0 && (
                  <button
                    onClick={handleContactSales}
                    className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat via WhatsApp
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Input Field */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tulis pertanyaan Anda"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 bg-white hover:bg-gray-50 text-red-600 px-6 py-4 rounded-full shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-110 z-9999 flex items-center gap-3 group border-2 border-red-100"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
            </svg>
            <span className="font-semibold hidden sm:inline">Tanya Ajnusa</span>
          </>
        )}
      </button>

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
