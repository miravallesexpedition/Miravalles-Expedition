import { tours as fallbackTours } from './siteConfig'
import { isSupabaseConfigured, supabase } from './supabase'

const fallbackBookings = []

const difficultyLabels = {
  easy: 'Fácil',
  moderate: 'Moderado',
  hard: 'Difícil'
}

function mapTour(row) {
  const price = Number(row.price)

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price,
    priceLabel: `$${price}`,
    level: difficultyLabels[row.difficulty_level] || row.difficulty_level || 'Moderado',
    image: row.image_url || fallbackTours[0].image
  }
}

function findFallbackTour(id) {
  return fallbackTours.find((tour) => String(tour.id) === String(id)) || null
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
      return data?.length ? data.map(mapTour) : fallbackTours
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

  async markPaymentCompleted(bookingId, paymentId) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          payment_status: 'completed',
          payment_method: 'paypal',
          payment_id: paymentId
        })
        .eq('id', bookingId)
        .select('*')
        .single()

      if (error) throw new Error(error.message)
      return data
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.payment_status = 'completed'
    booking.payment_method = 'paypal'
    booking.payment_id = paymentId
    return booking
  }
}
