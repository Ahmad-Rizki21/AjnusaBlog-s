import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Popup } from "@/components/Popup";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { generateMetadata as generateOpenGraphMetadata } from "@/lib/metadata";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structured-data";
import { COMPANY_INFO } from "@/data/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajnusa.com';

export const metadata: Metadata = {
  title: "AJNUSA - Internet Service Provider & IT Solution Provider",
  description: "Perusahaan penyedia layanan internet fiber optik, VSAT, SD-WAN terbaik di Indonesia. Juga melayani pembuatan website dan aplikasi mobile.",
  keywords: ["internet service provider", "fiber optic", "VSAT", "SD-WAN", "web development", "IT solution"],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/logo-ajnusa.png',
    shortcut: '/logo-ajnusa.png',
    apple: '/logo-ajnusa.png',
  },
  openGraph: {
    title: "AJNUSA - Internet Service Provider & IT Solution Provider",
    description: "Perusahaan penyedia layanan internet fiber optik, VSAT, SD-WAN terbaik di Indonesia. Juga melayani pembuatan website dan aplikasi mobile.",
    url: SITE_URL,
    siteName: COMPANY_INFO.name,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: COMPANY_INFO.name,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AJNUSA - Internet Service Provider & IT Solution Provider",
    description: "Perusahaan penyedia layanan internet fiber optik, VSAT, SD-WAN terbaik di Indonesia.",
    images: ['/images/og-image.jpg'],
    creator: '@ajnusa',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Structured Data */}
        <JsonLd id="organization" {...organizationSchema} />
        <JsonLd id="website" {...webSiteSchema} />

        {children}
        <Popup />
        <CookieConsent />
        <ChatWidget />
      </body>
    </html>
  );
}
