import { NextResponse } from 'next/server'
import { bookingService, tourService } from '@/lib/services'
import { paymentService } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const { bookingId } = await params
    const booking = await bookingService.getBookingById(bookingId)

    if (!booking) {
      return Response.json({ error: 'Reserva no encontrada' }, { status: 404 })
    }

    if (booking.status !== 'confirmed') {
      return Response.json({ error: 'La reserva debe estar confirmada antes de pagar' }, { status: 400 })
    }

    if ((booking.currency || 'USD') !== 'USD') {
      return Response.json(
        { error: 'PayPal solo está disponible para pagos en USD. Las reservas nacionales se coordinan por WhatsApp.' },
        { status: 400 }
      )
    }

    const tour = await tourService.getTourById(booking.tour_id)
    if (!tour) {
      return Response.json({ error: 'Tour no encontrado' }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const order = await paymentService.createPaymentOrder({
      ...booking,
      tour_name: tour.name
    }, {
      returnUrl: `${appUrl}/api/payments/paypal/capture?bookingId=${booking.id}`,
      cancelUrl: `${appUrl}/pago-cancelado?bookingId=${booking.id}`
    })

    const approveLink = order.links?.find((link) => link.rel === 'approve')?.href

    if (!approveLink) {
      return Response.json({ error: 'PayPal no devolvió un enlace de aprobación' }, { status: 502 })
    }

    await bookingService.markPaymentOrderCreated(booking.id, order.id)

    return NextResponse.redirect(approveLink)
  } catch (error) {
    console.error('Error creating PayPal order:', error)
    return Response.json({ error: 'Error al crear la orden de PayPal' }, { status: 500 })
  }
}
