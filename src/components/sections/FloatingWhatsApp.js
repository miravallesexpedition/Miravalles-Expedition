'use client'

import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

export default function FloatingWhatsApp() {
  const handleClick = () => {
    track('floating_whatsapp_click')
    const message = 'Hola, quiero información para reservar un tour con Miravalles Expedition.'
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 left-5 z-40 rounded-full bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-green-800"
      aria-label={`Contactar por WhatsApp ${contact.phoneDisplay}`}
    >
      WhatsApp
    </button>
  )
}
