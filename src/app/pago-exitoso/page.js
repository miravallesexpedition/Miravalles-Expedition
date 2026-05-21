import Link from 'next/link'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

export const metadata = {
  title: 'Pago completado',
  robots: {
    index: false,
    follow: false
  }
}

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams
  const bookingId = params?.bookingId
  const whatsappMessage = [
    'Hola, ya completé el pago de mi reserva en Miravalles Expedition.',
    bookingId ? `Reserva: ${bookingId}` : null,
    'Quiero confirmar los últimos detalles del tour.'
  ].filter(Boolean).join('\n')

  return (
    <main className="min-h-screen bg-[#061b13] px-4 py-16 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
          Pago recibido
        </p>
        <h1 className="mt-4 text-4xl font-black text-white">Tu reserva quedó pagada.</h1>
        <p className="mt-4 leading-8 text-white/75">
          Gracias por confiar en Miravalles Expedition. Revisaremos el pago y te contactaremos por el canal oficial para confirmar punto de encuentro, hora exacta y recomendaciones finales.
        </p>
        {bookingId && (
          <p className="mt-5 rounded-2xl bg-black/20 px-4 py-3 text-sm font-bold text-white/80">
            Código de reserva: {bookingId}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-amber-300 px-7 py-4 font-black text-[#071d14] hover:bg-amber-200"
          >
            Confirmar por WhatsApp
          </a>
          <Link
            href="/#tours"
            className="rounded-full border border-white/25 px-7 py-4 font-black text-white hover:bg-white/10"
          >
            Ver otros tours
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/55">
          Contacto oficial: {contact.phoneDisplay}
        </p>
      </section>
    </main>
  )
}
