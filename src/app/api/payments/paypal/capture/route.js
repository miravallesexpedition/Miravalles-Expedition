import { NextResponse } from 'next/server'
import { emailService } from '@/lib/emails'
import { bookingService, tourService } from '@/lib/services'
import { paymentService } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('bookingId')
  const orderId = searchParams.get('token')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  if (!bookingId || !orderId) {
    return NextResponse.redirect(`${appUrl}/pago-cancelado`)
  }

  try {
    const booking = await bookingService.getBookingById(bookingId)

    if (!booking) {
      return NextResponse.redirect(`${appUrl}/pago-cancelado?bookingId=${bookingId}`)
    }

    if (booking.payment_status === 'completed') {
      return NextResponse.redirect(`${appUrl}/pago-exitoso?bookingId=${bookingId}`)
    }

    const capture = await paymentService.capturePayment(orderId)
    const captureId = getCaptureId(capture) || orderId
    const updatedBooking = await bookingService.markPaymentCompleted(bookingId, captureId, {
      paypalOrderId: orderId
    })

    if (booking?.payment_status !== 'completed') {
      await sendPaymentEmail(updatedBooking)
    }

    return NextResponse.redirect(`${appUrl}/pago-exitoso?bookingId=${bookingId}`)
  } catch (error) {
    console.error('Error capturing PayPal payment:', error)
    return NextResponse.redirect(`${appUrl}/pago-cancelado?bookingId=${bookingId}`)
  }
}

function getCaptureId(capture) {
  return capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id || capture?.id || null
}

async function sendPaymentEmail(booking) {
  try {
    const tour = await tourService.getTourById(booking.tour_id)
    await emailService.sendPaymentReceivedEmail(booking.email, {
      ...booking,
      tour_name: tour?.name || 'Tour reservado'
    })
  } catch (error) {
    console.error('Error sending payment confirmation email:', error)
  }
}
