'use client'

import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

export default function FloatingWhatsApp({ onReserve }) {
  const handleWhatsAppClick = () => {
    track('floating_whatsapp_click')
    const message = 'Hola, quiero información para reservar un tour con Miravalles Expedition.'
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const handleReserveClick = () => {
    track('floating_reserve_click')
    onReserve?.()
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 grid grid-cols-2 gap-2 rounded-full border border-white/25 bg-[#061b13]/92 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-auto sm:min-w-[320px] lg:hidden">
      <button
        type="button"
        onClick={handleReserveClick}
        className="rounded-full bg-amber-300 px-4 py-3 text-sm font-black text-[#071d14] transition hover:-translate-y-0.5 hover:bg-amber-200"
        aria-label="Abrir formulario de reserva"
      >
        Reservar
      </button>
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="rounded-full bg-[#128c4a] px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0f7a40]"
        aria-label={`Contactar por WhatsApp ${contact.phoneDisplay}`}
      >
        WhatsApp
      </button>
    </div>
  )
}
