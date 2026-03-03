import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Popup } from "@/components/Popup";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema, generateSiteNavigationSchema } from "@/lib/structured-data";
import { COMPANY_INFO } from "@/data/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';

export const metadata: Metadata = {
  title: {
    default: "AJNUSA - Internet Service Provider & IT Solution Provider Indonesia",
    template: "%s | AJNUSA",
  },
  description: "PT. Artacomindo Jejaring Nusa (AJNUSA) - Perusahaan penyedia layanan internet VSAT, Fiber Optic, SD-WAN, VPN dan solusi IT terpercaya di Indonesia. Melayani corporate, pendidikan, pemerintahan, perbankan & maritim. Hubungi kami untuk konsultasi gratis.",
  keywords: [
    "internet service provider",
    "ISP Indonesia",
    "VSAT Indonesia",
    "fiber optic",
    "SD-WAN",
    "VPN perusahaan",
    "internet dedicated",
    "internet kantor",
    "koneksi internet stabil",
    "provider internet corporate",
    "AJNUSA",
    "Artacomindo",
    "internet maritim",
    "internet perbankan",
    "IT solution provider",
    "web development Indonesia",
    "Jakinet",
    "Jelantik",
    "internet rusun Jakarta",
    "VSAT broadband",
    "SCPC satellite",
  ],
  metadataBase: new URL(SITE_URL),
  applicationName: 'AJNUSA',
  authors: [{ name: 'PT. Artacomindo Jejaring Nusa', url: SITE_URL }],
  creator: 'PT. Artacomindo Jejaring Nusa',
  publisher: 'PT. Artacomindo Jejaring Nusa',
  category: 'technology',
  icons: {
    icon: '/logo-ajnusa.png',
    shortcut: '/logo-ajnusa.png',
    apple: '/logo-ajnusa.png',
  },
  openGraph: {
    title: "AJNUSA - Internet Service Provider & IT Solution Provider Indonesia",
    description: "Perusahaan penyedia layanan internet VSAT, Fiber Optic, SD-WAN dan solusi IT terpercaya di Indonesia. Melayani corporate, pendidikan, pemerintahan, perbankan & maritim.",
    url: SITE_URL,
    siteName: COMPANY_INFO.name,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AJNUSA - Internet Service Provider & IT Solution Provider Indonesia',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AJNUSA - Internet Service Provider & IT Solution Provider",
    description: "Perusahaan penyedia layanan internet VSAT, Fiber Optic, SD-WAN terbaik di Indonesia.",
    images: ['/images/og-image.jpg'],
    creator: '@ajnusa',
    site: '@ajnusa',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'id-ID': SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // IMPORTANT: Replace these with your actual verification codes from Google Search Console
    // Steps: 
    // 1. Go to https://search.google.com/search-console
    // 2. Add your property (ajnusa.com)
    // 3. Choose "HTML tag" verification method
    // 4. Copy the content value from the meta tag
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
    
    // Optional: Bing Webmaster Tools
    // other: { 'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE' },
  },
  other: {
    'geo.region': 'ID-JB',
    'geo.placename': 'Bekasi',
    'geo.position': '-6.2615;106.9901',
    'ICBM': '-6.2615, 106.9901',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '7 days',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const siteNavigationSchema = generateSiteNavigationSchema();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Structured Data */}
        <JsonLd id="organization" {...organizationSchema} />
        <JsonLd id="website" {...webSiteSchema} />
        <JsonLd id="localbusiness" {...localBusinessSchema} />
        <JsonLd id="navigation" {...siteNavigationSchema} />

        {children}
        <Popup />
        <CookieConsent />
        <ChatWidget />
      </body>
    </html>
  );
}
