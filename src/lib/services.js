import { tours as fallbackTours } from './siteConfig'
import { isSupabaseConfigured, supabase } from './supabase'
import { isConfirmationExpired } from './bookingRules'

const fallbackBookings = []
const retiredTourIds = new Set(['fotografia-naturaleza-miravalles'])
const tourAliases = {
  'fotografia-naturaleza-miravalles': 'tour-aves-vida-silvestre'
}

const difficultyLabels = {
  easy: 'Fácil',
  moderate: 'Moderado',
  hard: 'Difícil'
}

function mapTour(row) {
  const fallbackTour = findFallbackTour(row.id) || fallbackTours[0]
  const price = Number(fallbackTour.price || row.price)

  return {
    id: row.id,
    name: fallbackTour.name || row.name,
    shortName: fallbackTour.shortName,
    description: fallbackTour.description || row.description,
    price,
    priceLabel: fallbackTour.priceLabel || `$${price}`,
    level: fallbackTour.level || difficultyLabels[row.difficulty_level] || row.difficulty_level || 'Moderado',
    duration: fallbackTour.duration || (row.duration_hours ? `${row.duration_hours} horas` : null),
    distance: fallbackTour.distance || row.distance,
    image: fallbackTour.image || row.image_url,
    video: fallbackTour.video,
    videos: fallbackTour.videos,
    location: fallbackTour.location || row.location,
    highlights: fallbackTour.highlights,
    includes: fallbackTour.includes || row.included_items,
    notIncluded: fallbackTour.notIncluded || row.not_included_items,
    bring: fallbackTour.bring || row.what_to_bring,
    overview: fallbackTour.overview,
    whatToExpect: fallbackTour.whatToExpect,
    itinerary: fallbackTour.itinerary,
    recommendations: fallbackTour.recommendations,
    safety: fallbackTour.safety,
    gallery: fallbackTour.gallery,
    faqs: fallbackTour.faqs,
    pricing: fallbackTour.pricing
  }
}

function findFallbackTour(id) {
  const normalizedId = tourAliases[String(id)] || id
  return fallbackTours.find((tour) => String(tour.id) === String(normalizedId)) || null
}

export const tourService = {
  async getAllTours() {
    if (!isSupabaseConfigured) return fallbackTours

    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (error) throw new Error(error.message)
      const activeTours = (data || []).filter((tour) => !retiredTourIds.has(String(tour.id)))
      return activeTours.length ? activeTours.map(mapTour) : fallbackTours
    } catch (error) {
      console.error('Supabase tours unavailable, using fallback tours:', error)
      return fallbackTours
    }
  },

  async getTourById(id) {
    const fallbackTour = findFallbackTour(id)

    if (!isSupabaseConfigured) return fallbackTour

    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return data ? mapTour(data) : fallbackTour
    } catch (error) {
      console.error('Supabase tour lookup unavailable, using fallback tour:', error)
      return fallbackTour
    }
  }
}

export const bookingService = {
  async createBooking(booking) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert(booking)
          .select('*')
          .single()

        if (error) throw new Error(error.message)
        return { ...data, persisted: true }
      } catch (error) {
        console.error('Supabase booking insert unavailable, using manual fallback:', error)
      }
    }

    const newBooking = {
      id: `manual-${Date.now()}`,
      status: 'pending',
      confirmed_at: null,
      persisted: false,
      ...booking
    }
    fallbackBookings.push(newBooking)
    return newBooking
  },

  async getBookingByToken(token) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('confirmation_token', token)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return data
    }

    return fallbackBookings.find((item) => item.confirmation_token === token) || null
  },

  async getBookingById(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return data
    }

    return fallbackBookings.find((item) => String(item.id) === String(id)) || null
  },

  async getBookingsForDate(tourId, tourDate) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('id,tour_id,tour_date,preferred_time,status,participants_count,payment_status,confirmation_expires_at')
        .eq('tour_id', tourId)
        .eq('tour_date', tourDate)
        .in('status', ['pending', 'confirmed'])

      if (error) throw new Error(error.message)
      return (data || []).filter((item) => !isConfirmationExpired(item))
    }

    return fallbackBookings.filter((item) => (
      String(item.tour_id) === String(tourId) &&
      String(item.tour_date) === String(tourDate) &&
      ['pending', 'confirmed'].includes(item.status) &&
      !isConfirmationExpired(item)
    ))
  },

  async getRecentBookings(limit = 80) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw new Error(error.message)
      return data || []
    }

    return [...fallbackBookings]
      .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
      .slice(0, limit)
  },

  async confirmBooking(bookingId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          confirmed_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select('*')
        .single()

      if (error) throw new Error(error.message)
      return data
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.status = 'confirmed'
    booking.confirmed_at = new Date().toISOString()
    return booking
  },

  async markPaymentOrderCreated(bookingId, orderId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'pending',
          payment_method: 'paypal',
          payment_id: orderId,
          paypal_order_id: orderId
        })
        .eq('id', bookingId)
        .select('*')
        .single()

      if (error) throw new Error(error.message)
      return data
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.payment_status = 'pending'
    booking.payment_method = 'paypal'
    booking.payment_id = orderId
    booking.paypal_order_id = orderId
    return booking
  },

  async getBookingByPayPalOrderId(orderId) {
    if (!orderId) return null

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .or(`paypal_order_id.eq.${orderId},payment_id.eq.${orderId}`)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return data
    }

    return fallbackBookings.find((item) => (
      String(item.paypal_order_id) === String(orderId) ||
      String(item.payment_id) === String(orderId)
    )) || null
  },

  async markPaymentCompleted(bookingId, paymentId, metadata = {}) {
    const result = await this.markPaymentCompletedOnce(bookingId, paymentId, metadata)
    return result.booking
  },

  async markPaymentCompletedOnce(bookingId, paymentId, metadata = {}) {
    const completedAt = new Date().toISOString()
    const updatePayload = {
      payment_status: 'completed',
      payment_method: 'paypal',
      payment_id: paymentId,
      paypal_capture_id: paymentId,
      payment_completed_at: completedAt
    }

    if (metadata.paypalOrderId) {
      updatePayload.paypal_order_id = metadata.paypalOrderId
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .update(updatePayload)
        .eq('id', bookingId)
        .neq('payment_status', 'completed')
        .select('*')
        .maybeSingle()

      if (error) throw new Error(error.message)

      if (data) {
        return { booking: data, wasAlreadyCompleted: false }
      }

      const existingBooking = await this.getBookingById(bookingId)
      return {
        booking: existingBooking,
        wasAlreadyCompleted: existingBooking?.payment_status === 'completed'
      }
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return { booking: null, wasAlreadyCompleted: false }

    if (booking.payment_status === 'completed') {
      return { booking, wasAlreadyCompleted: true }
    }

    booking.payment_status = 'completed'
    booking.payment_method = 'paypal'
    booking.payment_id = paymentId
    booking.paypal_capture_id = paymentId
    booking.paypal_order_id = metadata.paypalOrderId || booking.paypal_order_id
    booking.payment_completed_at = completedAt
    return { booking, wasAlreadyCompleted: false }
  },

  async markPaymentFailed(bookingId, reason = 'PayPal rechazó o reversó el pago') {
    const failedAt = new Date().toISOString()

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'failed',
          payment_failure_reason: reason,
          payment_failed_at: failedAt
        })
        .eq('id', bookingId)
        .select('*')
        .single()

      if (error) throw new Error(error.message)
      return data
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.payment_status = 'failed'
    booking.payment_failure_reason = reason
    booking.payment_failed_at = failedAt
    return booking
  }
}
