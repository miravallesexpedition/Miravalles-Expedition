import Link from 'next/link'
import { bookingService, tourService } from '@/lib/services'
import { buildMailtoUrl, buildWhatsAppUrl, contact } from '@/lib/siteConfig'
import { isPayPalConfigured } from '@/lib/paypal'
import { formatMoney } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

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
    `Participantes: ${booking.participants_count}`,
    `Total: ${totalLabel}`
  ].join('\n')

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
          Reserva confirmada
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Pago de reserva</h1>
        <div className="mb-6 space-y-2 text-gray-700">
          <p><strong>Tour:</strong> {tour?.name || 'Tour reservado'}</p>
          <p><strong>Fecha:</strong> {booking.tour_date}</p>
          <p><strong>Participantes:</strong> {booking.participants_count}</p>
          <p><strong>Moneda:</strong> {currency}</p>
          <p className="text-2xl font-bold text-green-700">{totalLabel}</p>
        </div>

        {canPayWithPayPal ? (
          <Link
            href={`/api/payments/paypal/create/${booking.id}`}
            className="inline-flex w-full justify-center rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Pagar con PayPal
          </Link>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">
              {currency === 'CRC' ? 'Pago nacional por coordinar' : 'Pago en línea pendiente de activar'}
            </p>
            <p className="mt-2 text-sm leading-6 text-amber-800">
              {currency === 'CRC'
                ? 'Las reservas nacionales en colones se coordinan por WhatsApp, depósito o efectivo.'
                : 'PayPal queda disponible cuando se configuren las credenciales reales. Mientras tanto, podés coordinar depósito, efectivo o método preferido por WhatsApp.'}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={buildWhatsAppUrl(summary)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
              >
                Coordinar por WhatsApp
              </a>
              <a
                href={buildMailtoUrl('Pago de reserva Miravalles Expedition', summary)}
                className="inline-flex justify-center rounded bg-gray-950 px-4 py-2 font-semibold text-white hover:bg-gray-800"
              >
                Enviar por correo
              </a>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-gray-500">
          Contacto oficial: {contact.phoneDisplay}
        </p>
      </section>
    </main>
  )
}

function Message({ title, body }) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-700">{body}</p>
      </section>
    </main>
  )
}
