import { bookingService, tourService } from '@/lib/services'
import { emailService } from '@/lib/emails'
import { paymentService } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  let event

  try {
    event = await request.json()
  } catch (error) {
    return Response.json({ error: 'Evento inválido' }, { status: 400 })
  }

  try {
    const verified = await paymentService.verifyWebhookSignature(request.headers, event)

    if (!verified) {
      return Response.json({ error: 'Firma de PayPal inválida' }, { status: 401 })
    }

    const eventType = event.event_type

    if (eventType === 'CHECKOUT.ORDER.APPROVED') {
      const paypalOrderId = getOrderIdFromEvent(event)
      const booking = await findBookingFromPayPalEvent(event)

      if (!booking) {
        return Response.json({ received: true, ignored: 'booking-not-found', paypalOrderId })
      }

      if (booking.payment_status === 'completed') {
        return Response.json({
          received: true,
          eventType,
          bookingId: booking.id,
          paymentStatus: 'already-completed'
        })
      }

      const capture = await paymentService.capturePayment(paypalOrderId)
      const captureId = getCaptureId(capture) || paypalOrderId
      const updatedBooking = await bookingService.markPaymentCompleted(booking.id, captureId, {
        paypalOrderId
      })

      await sendPaymentEmail(updatedBooking)

      return Response.json({
        received: true,
        eventType,
        bookingId: booking.id,
        paymentStatus: 'completed'
      })
    }

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const paypalOrderId = getOrderIdFromEvent(event)
      const captureId = event.resource?.id || paypalOrderId
      const booking = await findBookingFromPayPalEvent(event)

      if (!booking) {
        return Response.json({ received: true, ignored: 'booking-not-found', paypalOrderId })
      }

      const wasAlreadyPaid = booking.payment_status === 'completed'
      const updatedBooking = await bookingService.markPaymentCompleted(booking.id, captureId, {
        paypalOrderId
      })

      if (!wasAlreadyPaid) {
        await sendPaymentEmail(updatedBooking)
      }

      return Response.json({
        received: true,
        eventType,
        bookingId: booking.id,
        paymentStatus: 'completed'
      })
    }

    if (eventType === 'PAYMENT.CAPTURE.DENIED' || eventType === 'CHECKOUT.PAYMENT-APPROVAL.REVERSED') {
      const booking = await findBookingFromPayPalEvent(event)

      if (booking) {
        await bookingService.markPaymentFailed(booking.id, event.summary || eventType)
      }

      return Response.json({
        received: true,
        eventType,
        bookingId: booking?.id || null,
        paymentStatus: booking ? 'failed' : 'ignored'
      })
    }

    return Response.json({ received: true, ignored: eventType })
  } catch (error) {
    console.error('Error processing PayPal webhook:', error)
    return Response.json({ error: 'Error al procesar webhook de PayPal' }, { status: 500 })
  }
}

async function findBookingFromPayPalEvent(event) {
  const paypalOrderId = getOrderIdFromEvent(event)
  const customBookingId = event.resource?.custom_id

  if (paypalOrderId) {
    const booking = await bookingService.getBookingByPayPalOrderId(paypalOrderId)
    if (booking) return booking
  }

  if (customBookingId) {
    return bookingService.getBookingById(customBookingId)
  }

  return null
}

function getOrderIdFromEvent(event) {
  return (
    event.resource?.supplementary_data?.related_ids?.order_id ||
    event.resource?.id ||
    null
  )
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
    console.error('Error sending payment webhook email:', error)
  }
}
