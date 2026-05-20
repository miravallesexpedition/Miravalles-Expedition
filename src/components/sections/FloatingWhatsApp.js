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
      className="fixed bottom-4 right-4 z-50 rounded-full bg-[#128c4a] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#0f7a40] sm:bottom-6 sm:right-6"
      aria-label={`Contactar por WhatsApp ${contact.phoneDisplay}`}
    >
      WhatsApp
    </button>
  )
}
