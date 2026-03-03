import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AJNUSA - PT. Artacomindo Jejaring Nusa',
    short_name: 'AJNUSA',
    description: 'Internet Service Provider & IT Solution Provider terpercaya di Indonesia. Layanan VSAT, Fiber Optic, SD-WAN, dan solusi IT.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#B91C1C',
    orientation: 'portrait-primary',
    categories: ['business', 'technology', 'internet'],
    lang: 'id',
    icons: [
      {
        src: '/logo-ajnusa.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-ajnusa.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
