export default function manifest() {
  return {
    name: 'Miravalles Expedition',
    short_name: 'Miravalles',
    description: 'Tours de aventura, cataratas escondidas, aguas termales y experiencias locales cerca del Volcán Miravalles en Guanacaste, Costa Rica.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#061b13',
    theme_color: '#061b13',
    icons: [
      {
        src: '/icon-48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
}
