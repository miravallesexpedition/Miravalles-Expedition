import { NextResponse } from 'next/server'
import { bookingService } from '@/lib/services'
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
    const capture = await paymentService.capturePayment(orderId)
    await bookingService.markPaymentCompleted(bookingId, capture.id || orderId)

    return NextResponse.redirect(`${appUrl}/pago-exitoso?bookingId=${bookingId}`)
  } catch (error) {
    console.error('Error capturing PayPal payment:', error)
    return NextResponse.redirect(`${appUrl}/pago-cancelado?bookingId=${bookingId}`)
  }
}
