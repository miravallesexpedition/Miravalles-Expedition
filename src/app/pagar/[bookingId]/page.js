import Link from 'next/link'
import { bookingService, tourService } from '@/lib/services'

export const dynamic = 'force-dynamic'

export default async function PayBookingPage({ params }) {
  const booking = await bookingService.getBookingById(params.bookingId)

  if (!booking) {
    return <Message title="Reserva no encontrada" body="No encontramos una reserva con ese identificador." />
  }

  if (booking.status !== 'confirmed') {
    return <Message title="Reserva pendiente" body="Primero debes confirmar la reserva desde el enlace enviado a tu correo." />
  }

  const tour = await tourService.getTourById(booking.tour_id)

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Pago de reserva</h1>
        <div className="mb-6 space-y-2 text-gray-700">
          <p><strong>Tour:</strong> {tour?.name || 'Tour reservado'}</p>
          <p><strong>Fecha:</strong> {booking.tour_date}</p>
          <p><strong>Participantes:</strong> {booking.participants_count}</p>
          <p className="text-2xl font-bold text-green-700">${booking.total_price}</p>
        </div>
        <Link
          href={`/api/payments/paypal/create/${booking.id}`}
          className="inline-flex w-full justify-center rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Pagar con PayPal
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
