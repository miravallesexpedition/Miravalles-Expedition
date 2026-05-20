import { confirmBookingByToken } from '@/lib/bookingFlow'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const { token } = await params
    const result = await confirmBookingByToken(token)

    if (result.status === 'not-found') {
      return Response.json(
        { error: 'Token inválido o expirado' },
        { status: 404 }
      )
    }

    if (result.status === 'tour-not-found') {
      return Response.json(
        { error: 'Tour no encontrado para esta reserva' },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      alreadyConfirmed: result.status === 'already-confirmed',
      message: result.status === 'already-confirmed'
        ? 'Esta reserva ya fue confirmada'
        : 'Reserva confirmada exitosamente',
      bookingId: result.booking.id,
      paymentUrl: result.paymentUrl
    })
  } catch (error) {
    console.error('Error confirming booking:', error)
    return Response.json(
      { error: 'Error al confirmar la reserva' },
      { status: 500 }
    )
  }
}
