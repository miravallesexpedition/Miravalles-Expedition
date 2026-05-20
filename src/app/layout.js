import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import { business, seoKeywords, tourImages } from '@/lib/siteConfig'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://miravallesexpedition.com'),
  title: {
    default: 'Miravalles Expedition | Premium Adventure Tours in Guanacaste',
    template: '%s | Miravalles Expedition'
  },
  description:
    'Premium adventure tours in Guanacaste near Miravalles Volcano: hidden waterfalls, hiking Costa Rica, hot springs, birdwatching and authentic local guides.',
  keywords: seoKeywords,
  openGraph: {
    title: 'Miravalles Expedition',
    description:
      'Hidden waterfalls, volcanic trails, birdwatching and authentic local adventure tours near Miravalles Volcano in Guanacaste, Costa Rica.',
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
