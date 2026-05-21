import Link from 'next/link'
import { bookingService, tourService } from '@/lib/services'
import { buildMailtoUrl, buildWhatsAppUrl, contact } from '@/lib/siteConfig'
import { isPayPalConfigured } from '@/lib/paypal'
import { formatMoney } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Pago de reserva',
  robots: {
    index: false,
    follow: false
  }
}

export default async function PayBookingPage({ params }) {
  const { bookingId } = await params
  const booking = await bookingService.getBookingById(bookingId)

  if (!booking) {
    return <Message title="Reserva no encontrada" body="No encontramos una reserva con ese identificador." />
  }

  if (booking.status !== 'confirmed') {
    return <Message title="Reserva pendiente" body="Primero debés confirmar la reserva desde el enlace enviado a tu correo." />
  }

  const tour = await tourService.getTourById(booking.tour_id)
  const currency = booking.currency || 'USD'
  const totalLabel = formatMoney(booking.total_price, currency)
  const canPayWithPayPal = isPayPalConfigured && currency === 'USD'
  const summary = [
    'Hola, quiero coordinar el pago de mi reserva.',
    `Reserva: ${booking.id}`,
    `Tour: ${tour?.name || 'Tour reservado'}`,
    `Fecha: ${booking.tour_date}`,
    `Hora preferida: ${formatTime(booking.preferred_time)}`,
    `Participantes: ${booking.participants_count}`,
    `Total: ${totalLabel}`
  ].join('\n')

  return (
    <main className="min-h-screen bg-[#061b13] px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-amber-200">
          Reserva confirmada
        </p>
        <h1 className="mb-4 text-3xl font-black text-white">Pago de reserva</h1>
        <div className="mb-6 space-y-2 text-white/75">
          <p><strong>Tour:</strong> {tour?.name || 'Tour reservado'}</p>
          <p><strong>Fecha:</strong> {booking.tour_date}</p>
          <p><strong>Hora preferida:</strong> {formatTime(booking.preferred_time)}</p>
          <p><strong>Participantes:</strong> {booking.participants_count}</p>
          <p><strong>Moneda:</strong> {currency}</p>
          <p className="text-2xl font-black text-amber-200">{totalLabel}</p>
        </div>

        {canPayWithPayPal ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="font-semibold text-blue-950">Pago seguro disponible</p>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              Al continuar se abrirá PayPal para completar el pago en una página segura. No se registra el pago hasta que lo confirmés en PayPal.
            </p>
            <p className="mt-2 text-xs font-semibold text-blue-800">
              Miravalles Expedition no guarda datos de tarjeta. Revisá que la página de pago pertenezca a PayPal antes de finalizar.
            </p>
            <Link
              href={`/api/payments/paypal/create/${booking.id}`}
              className="mt-4 inline-flex w-full justify-center rounded-full bg-blue-600 px-5 py-3 font-black text-white hover:bg-blue-700"
            >
              Continuar con PayPal
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">
              {currency === 'CRC' ? 'Pago en colones por coordinar' : 'Pago manual disponible'}
            </p>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              {currency === 'CRC'
                ? 'Las reservas en colones se coordinan por WhatsApp, depósito o efectivo para mantener el monto exacto de la tarifa local.'
                : 'Esta reserva no está disponible para pago automático en este momento. Podés coordinar depósito, efectivo o método preferido por WhatsApp.'}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={buildWhatsAppUrl(summary)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-full bg-green-700 px-4 py-2 font-black text-white hover:bg-green-800"
              >
                Coordinar por WhatsApp
              </a>
              <a
                href={buildMailtoUrl('Pago de reserva Miravalles Expedition', summary)}
                className="inline-flex justify-center rounded-full bg-gray-950 px-4 py-2 font-black text-white hover:bg-gray-800"
              >
                Enviar por correo
              </a>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-white/55">
          Contacto oficial: {contact.phoneDisplay}
        </p>
      </section>
    </main>
  )
}

function formatTime(value) {
  if (!value) return 'Por confirmar'
  if (!/^\d{2}:\d{2}$/.test(String(value))) return value
  const [hours, minutes] = String(value).split(':').map(Number)
  const suffix = hours >= 12 ? 'p.m.' : 'a.m.'
  const hour12 = hours % 12 || 12
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`
}

function Message({ title, body }) {
  return (
    <main className="min-h-screen bg-[#061b13] px-4 py-16 text-white">
      <section className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <h1 className="mb-3 text-3xl font-black text-white">{title}</h1>
        <p className="leading-7 text-white/75">{body}</p>
      </section>
    </main>
  )
}
