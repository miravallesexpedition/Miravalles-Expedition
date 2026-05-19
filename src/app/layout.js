import { Analytics } from '@vercel/analytics/next'
import { business, seoKeywords, tourImages } from '@/lib/siteConfig'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://miravallesexpedition.com'),
  title: {
    default: 'Miravalles Expedition | Tours en Guanacaste y Cataratas en Costa Rica',
    template: '%s | Miravalles Expedition'
  },
  description:
    'Tours en Guanacaste cerca del Volcán Miravalles: hiking Costa Rica, cataratas escondidas, aguas termales, aves, eco tourism y adventure tours con guía local.',
  keywords: seoKeywords,
  openGraph: {
    title: 'Miravalles Expedition',
    description:
      'Caminatas, cataratas escondidas, aves y experiencias locales cerca del Volcán Miravalles en Guanacaste, Costa Rica.',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
