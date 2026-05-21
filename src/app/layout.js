import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import { business, seoKeywords, tourImages } from '@/lib/siteConfig'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://miravallesexpedition.com'),
  title: {
    default: 'Miravalles Expedition | Tours de aventura premium en Guanacaste',
    template: '%s | Miravalles Expedition'
  },
  description:
    'Tours de aventura premium en Guanacaste cerca del Volcán Miravalles: cataratas escondidas, caminatas, aguas termales, aves y guías locales auténticos.',
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
        url: tourImages.logo,
        width: 1254,
        height: 1254,
        alt: 'Logo de Miravalles Expedition'
      }
    ]
  },
  alternates: {
    canonical: '/'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
