import { bookingService, tourService } from '@/lib/services'
import { emailService } from '@/lib/emails'
import { isConfirmationExpired } from '@/lib/bookingRules'
import { getAppUrl } from '@/lib/appUrl'

export async function confirmBookingByToken(token) {
  const booking = await bookingService.getBookingByToken(token)

  if (!booking) {
    return { status: 'not-found' }
  }

  const tour = await tourService.getTourById(booking.tour_id)

  if (!tour) {
    return { status: 'tour-not-found', booking }
  }

  if (booking.status === 'confirmed') {
    return {
      status: 'already-confirmed',
      booking,
      tour,
      paymentUrl: getPaymentUrl(booking.id)
    }
  }

  if (isConfirmationExpired(booking)) {
    return {
      status: 'expired',
      booking,
      tour
    }
  }

  const confirmedBooking = await bookingService.confirmBooking(booking.id)
  const paymentUrl = getPaymentUrl(confirmedBooking.id)

  try {
    await emailService.sendBookingConfirmedEmail(booking.email, {
      id: confirmedBooking.id,
      first_name: booking.first_name,
      tour_name: tour.name,
      tour_date: booking.tour_date,
      participants_count: booking.participants_count,
      total_price: booking.total_price,
      currency: booking.currency || 'USD',
      customer_type: booking.customer_type || 'foreign'
    }, paymentUrl)
  } catch (emailError) {
    console.error('Error sending confirmed booking email:', emailError)
  }

  return {
    status: 'confirmed',
    booking: confirmedBooking,
    tour,
    paymentUrl
  }
}

function getPaymentUrl(bookingId) {
  return `${getAppUrl()}/pagar/${bookingId}`
}
