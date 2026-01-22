'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO, COMPANY_INFO } from '@/data/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-lg flex items-center justify-center">
                 <img src="/logo-ajnusa.png" alt="AJNUSA Logo" className="w-24 h-auto object-contain" />
              </div>
              <span className="text-xl font-bold text-white">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex space-x-3">
              {CONTACT_INFO.social?.facebook && (
                <Link
                  href={CONTACT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </Link>
              )}
              {CONTACT_INFO.social?.instagram && (
                <Link
                  href={CONTACT_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layanan Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Fiber Optic Internet</li>
              <li>VSAT Satellite</li>
              <li>SD-WAN Solution</li>
              <li>VPN Corporate</li>
              <li>Web Development</li>
              <li>Mobile App Development</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-400">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-red-500 flex-shrink-0 mt-1" />
                <div className="flex flex-col space-y-1">
                  {CONTACT_INFO.phones?.map((phone, index) => (
                    <Link
                      key={index}
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {phone}
                    </Link>
                  ))}
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-red-500 flex-shrink-0" />
                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  {CONTACT_INFO.email}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {COMPANY_INFO.fullName}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
