import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import { business, seoKeywords, tourImages } from '@/lib/siteConfig'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://miravallesexpedition.com'),
  applicationName: 'Miravalles Expedition',
  creator: 'Miravalles Expedition',
  publisher: 'Miravalles Expedition',
  category: 'travel',
  referrer: 'origin-when-cross-origin',
  manifest: '/manifest.webmanifest',
  title: {
    default: 'Miravalles Expedition | Tours de aventura premium en Guanacaste',
    template: '%s | Miravalles Expedition'
  },
  description:
    'Tours de aventura premium en Guanacaste cerca del Volcán Miravalles: Catarata Piedras Rojas, Morpho Blanca, Cabro Muco, expedición extrema al volcán, Termales El Guayacán, aves y guías locales auténticos.',
  keywords: seoKeywords,
  openGraph: {
    title: 'Miravalles Expedition',
    description:
      'Cataratas escondidas, senderos volcánicos, observación de aves y tours locales cerca del Volcán Miravalles en Guanacaste, Costa Rica.',
    url: 'https://miravallesexpedition.com',
    siteName: business.name,
    locale: 'es_CR',
    type: 'website',
    images: [
      {
        url: tourImages.hero,
        width: 2200,
        height: 1467,
        alt: 'Catarata y poza natural en Miravalles, Costa Rica'
      },
      {
        url: tourImages.logo,
        width: 1254,
        height: 1254,
        alt: 'Logo de Miravalles Expedition'
      }
    ]
  },
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miravalles Expedition',
    description:
      'Cataratas escondidas, senderos volcánicos, observación de aves y experiencias locales en Guanacaste, Costa Rica.',
    images: [tourImages.hero]
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <StructuredData />
        <a href="#contenido-principal" className="skip-link">
          Saltar al contenido
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
