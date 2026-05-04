import { bookingService, tourService } from '@/lib/services'
import { emailService } from '@/lib/emails'

export async function GET(request, { params }) {
  try {
    const { token } = params

    // Obtener reserva por token
    const booking = await bookingService.getBookingByToken(token)

    if (!booking) {
      return Response.json(
        { error: 'Token inválido o expirado' },
        { status: 404 }
      )
    }

    if (booking.status === 'confirmed') {
      return Response.json(
        { error: 'Esta reserva ya fue confirmada' },
        { status: 400 }
      )
    }

    // Obtener detalles del tour
    const tour = await tourService.getTourById(booking.tour_id)

    // Confirmar la reserva
    const confirmedBooking = await bookingService.confirmBooking(booking.id)

    // Enviar email de confirmación
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const paymentUrl = `${appUrl}/pagar/${confirmedBooking.id}`

    try {
      await emailService.sendBookingConfirmedEmail(booking.email, {
        id: confirmedBooking.id,
        first_name: booking.first_name,
        tour_name: tour.name,
        tour_date: booking.tour_date,
        participants_count: booking.participants_count,
        total_price: booking.total_price
      }, paymentUrl)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
    }

    return Response.json({
      success: true,
      message: 'Reserva confirmada exitosamente',
      bookingId: confirmedBooking.id,
      paymentUrl: paymentUrl
    })
  } catch (error) {
    console.error('Error confirming booking:', error)
    return Response.json(
      { error: 'Error al confirmar la reserva' },
      { status: 500 }
    )
  }
}
