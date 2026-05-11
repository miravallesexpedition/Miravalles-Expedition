import { isSupabaseConfigured, supabase } from './supabase'

const fallbackTours = [
  {
    id: '1',
    name: 'Volcán Miravalles',
    price: 65,
    priceLabel: '$65',
    level: 'Fácil',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
    description: 'Explora el majestuoso volcán con vistas panorámicas'
  },
  {
    id: '2',
    name: 'Cataratas Escondidas',
    price: 75,
    priceLabel: '$75',
    level: 'Moderado',
    image: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=400&h=300',
    description: 'Camina entre cascadas de agua cristalina'
  },
  {
    id: '3',
    name: 'Aguas Termales',
    price: 55,
    priceLabel: '$55',
    level: 'Relajado',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300',
    description: 'Relájate en piscinas naturales de agua caliente'
  }
]

const fallbackBookings = []

const difficultyLabels = {
  easy: 'Fácil',
  moderate: 'Moderado',
  hard: 'Difícil'
}

function throwSupabaseError(error) {
  if (error) {
    throw new Error(error.message)
  }
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
    image: row.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300'
  }
}

export const tourService = {
  async getAllTours() {
    if (!isSupabaseConfigured) return fallbackTours

    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    throwSupabaseError(error)
    return data.map(mapTour)
  },

  async getTourById(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      throwSupabaseError(error)
      return data ? mapTour(data) : null
    }

    return fallbackTours.find((tour) => String(tour.id) === String(id)) || null
  },

  async createTour(tour) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('tours')
        .insert(tour)
        .select('*')
        .single()

      throwSupabaseError(error)
      return mapTour(data)
    }

    const newTour = {
      id: String(Date.now()),
      ...tour
    }
    fallbackTours.push(newTour)
    return newTour
  },

  async updateTour(id, tour) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('tours')
        .update(tour)
        .eq('id', id)
        .select('*')
        .single()

      throwSupabaseError(error)
      return data ? mapTour(data) : null
    }

    const index = fallbackTours.findIndex((item) => String(item.id) === String(id))
    if (index === -1) return null
    fallbackTours[index] = { ...fallbackTours[index], ...tour }
    return fallbackTours[index]
  },

  async deleteTour(id) {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('tours')
        .update({ is_active: false })
        .eq('id', id)

      throwSupabaseError(error)
      return true
    }

    const index = fallbackTours.findIndex((item) => String(item.id) === String(id))
    if (index === -1) return false
    fallbackTours.splice(index, 1)
    return true
  }
}

export const bookingService = {
  async createBooking(booking) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select('*')
        .single()

      throwSupabaseError(error)
      return data
    }

    const newBooking = {
      id: String(Date.now()),
      status: 'pending',
      confirmed_at: null,
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

      throwSupabaseError(error)
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

      throwSupabaseError(error)
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

      throwSupabaseError(error)
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

      throwSupabaseError(error)
      return data
    }

    const booking = fallbackBookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.payment_status = 'completed'
    booking.payment_method = 'paypal'
    booking.payment_id = paymentId
    return booking
  },

  async getBookingsByEmail(email) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', email)

      throwSupabaseError(error)
      return data
    }

    return fallbackBookings.filter((item) => item.email === email)
  },

  async getAllBookings() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      throwSupabaseError(error)
      return data
    }

    return fallbackBookings
  }
}
