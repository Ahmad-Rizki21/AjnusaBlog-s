import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Popup } from "@/components/Popup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AJNUSA - Internet Service Provider & IT Solution Provider",
  description: "Perusahaan penyedia layanan internet fiber optik, VSAT, SD-WAN terbaik di Indonesia. Juga melayani pembuatan website dan aplikasi mobile.",
  keywords: ["internet service provider", "fiber optic", "VSAT", "SD-WAN", "web development", "IT solution"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Popup />
      </body>
    </html>
  );
}
