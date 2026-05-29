export function getConfirmationExpiryHours() {
  const hours = Number(process.env.BOOKING_CONFIRMATION_EXPIRES_HOURS || 24)
  return Number.isFinite(hours) && hours > 0 ? hours : 24
}

export function createConfirmationExpiryDate(now = new Date()) {
  return new Date(now.getTime() + getConfirmationExpiryHours() * 60 * 60 * 1000)
}

export function isConfirmationExpired(booking, now = new Date()) {
  if (!booking?.confirmation_expires_at || booking.status === 'confirmed') return false
  return new Date(booking.confirmation_expires_at).getTime() <= now.getTime()
}

export function getCapacityForTour(tourId) {
  const defaultCapacity = Number(process.env.MAX_PARTICIPANTS_PER_TOUR || process.env.MAX_PARTICIPANTS_PER_SLOT || 10)
  const tourCapacityById = {
    'aguas-termales-miravalles': Number(process.env.MAX_PARTICIPANTS_HOT_SPRINGS || 30)
  }

  const capacity = tourCapacityById[tourId] || defaultCapacity
  return Number.isFinite(capacity) && capacity > 0 ? capacity : 10
}

export function countBookedParticipantsForSlot(bookings, preferredTime) {
  return (bookings || []).reduce((total, booking) => {
    const time = booking.preferred_time || '07:00'
    if (time !== preferredTime) return total

    return total + Math.max(1, Number(booking.participants_count || 1))
  }, 0)
}

export async function getSlotAvailability(bookingService, tourId, tourDate, preferredTime) {
  const capacity = getCapacityForTour(tourId)
  const bookings = await bookingService.getBookingsForDate(tourId, tourDate)
  const booked = countBookedParticipantsForSlot(bookings, preferredTime)
  const remaining = Math.max(0, capacity - booked)

  return {
    capacity,
    booked,
    remaining,
    available: remaining > 0
  }
}
