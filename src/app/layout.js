import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata = {
  title: 'Miravalles Expedition - Tours y Aventuras',
  description: 'Tours en el Volcán Miravalles - Cataratas, aguas termales y aventura guiada',
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
