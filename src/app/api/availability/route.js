import { bookingService } from '@/lib/services'
import { bookingTimeSlots } from '@/lib/timeSlots'
import { getCapacityForTour } from '@/lib/bookingRules'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const tourId = searchParams.get('tourId')
    const date = searchParams.get('date')

    if (!tourId || !/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
      return Response.json(
        { error: 'Tour y fecha son requeridos' },
        { status: 400 }
      )
    }

    const capacityPerSlot = getCapacityForTour(tourId)
    const bookings = await bookingService.getBookingsForDate(tourId, date)
    const bookedByTime = bookings.reduce((acc, booking) => {
      const time = booking.preferred_time || '07:00'
      const people = Math.max(1, Number(booking.participants_count || 1))
      acc[time] = (acc[time] || 0) + people
      return acc
    }, {})

    const slots = bookingTimeSlots.map((slot) => {
      const booked = bookedByTime[slot.value] || 0
      const remaining = Math.max(0, capacityPerSlot - booked)

      return {
        ...slot,
        booked,
        remaining,
        available: remaining > 0
      }
    })

    return Response.json({
      tourId,
      date,
      capacityPerSlot,
      largeGroupsMessage: 'Para grupos grandes se confirma disponibilidad manualmente por WhatsApp.',
      slots
    })
  } catch (error) {
    console.error('Error loading availability:', error)
    return Response.json(
      { error: 'Error al revisar disponibilidad' },
      { status: 500 }
    )
  }
}
