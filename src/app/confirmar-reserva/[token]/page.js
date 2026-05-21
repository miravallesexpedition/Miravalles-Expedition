import Link from 'next/link'
import { confirmBookingByToken } from '@/lib/bookingFlow'
import { formatMoney } from '@/lib/pricing'

export const dynamic = 'force-dynamic'

export default async function ConfirmBookingPage({ params }) {
  const { token } = await params
  const result = await confirmBookingByToken(token)

  if (result.status === 'not-found') {
    return <Message title="Reserva no encontrada" body="El enlace de confirmación no es válido o ya expiró." />
  }

  if (result.status === 'tour-not-found') {
    return <Message title="No pudimos confirmar" body="La reserva existe, pero el tour asociado no fue encontrado." />
  }

  const alreadyConfirmed = result.status === 'already-confirmed'
  const currency = result.booking.currency || 'USD'
  const totalLabel = formatMoney(result.booking.total_price, currency)
  const paymentCta = currency === 'USD' ? 'Continuar al pago con PayPal' : 'Coordinar pago nacional'

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <p className="mb-2 text-sm font-semibold text-green-700">
          {alreadyConfirmed ? 'Reserva ya confirmada' : 'Reserva confirmada'}
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {alreadyConfirmed ? 'Tu reserva ya estaba lista' : 'Gracias por confirmar tu reserva'}
        </h1>
        <div className="mb-6 space-y-2 text-gray-700">
          <p><strong>Tour:</strong> {result.tour.name}</p>
          <p><strong>Fecha:</strong> {result.booking.tour_date}</p>
          <p><strong>Participantes:</strong> {result.booking.participants_count}</p>
          <p><strong>Total:</strong> {totalLabel}</p>
        </div>
        <Link
          href={result.paymentUrl}
          className="inline-flex w-full justify-center rounded bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
        >
          {paymentCta}
        </Link>
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
