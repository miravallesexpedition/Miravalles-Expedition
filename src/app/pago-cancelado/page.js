import Link from 'next/link'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

export const metadata = {
  title: 'Pago no completado',
  robots: {
    index: false,
    follow: false
  }
}

export default async function PaymentCanceledPage({ searchParams }) {
  const params = await searchParams
  const bookingId = params?.bookingId
  const whatsappMessage = [
    'Hola, tuve un problema o cancelé el pago de mi reserva en Miravalles Expedition.',
    bookingId ? `Reserva: ${bookingId}` : null,
    'Quiero recibir ayuda para completar el pago.'
  ].filter(Boolean).join('\n')

  return (
    <main className="min-h-screen bg-[#f8f4ea] px-4 py-16 text-[#11130f]">
      <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center rounded-[2rem] bg-white p-8 text-center shadow-2xl sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-700">
          Pago no completado
        </p>
        <h1 className="mt-4 text-4xl font-black">No se registró ningún pago.</h1>
        <p className="mt-4 leading-8 text-gray-700">
          Tu reserva no queda cobrada si no finalizaste en PayPal. Podés intentar de nuevo desde el enlace de pago o escribirnos para coordinar una forma segura de completar la reserva.
        </p>
        {bookingId && (
          <p className="mt-5 rounded-2xl bg-[#f8f4ea] px-4 py-3 text-sm font-bold text-gray-700">
            Código de reserva: {bookingId}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#071d14] px-7 py-4 font-black text-white hover:bg-green-900"
          >
            Ayuda por WhatsApp
          </a>
          <Link
            href="/#tours"
            className="rounded-full border border-[#071d14] px-7 py-4 font-black text-[#071d14] hover:bg-[#071d14] hover:text-white"
          >
            Volver a tours
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Contacto oficial: {contact.phoneDisplay}
        </p>
      </section>
    </main>
  )
}
