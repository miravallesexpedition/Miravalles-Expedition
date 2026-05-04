import { supabase } from '@/lib/supabase'

export const tourService = {
  // Obtener todos los tours
  async getAllTours() {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching tours:', error.message)
      // Fallback to static data
      return [
        {
          name: 'Volcán Miravalles',
          price: '$65',
          level: 'Fácil',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
          description: 'Explora el majestuoso volcán con vistas panorámicas'
        },
        {
          name: 'Cataratas Escondidas',
          price: '$75',
          level: 'Moderado',
          image: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=400&h=300',
          description: 'Camina entre cascadas de agua cristalina'
        },
        {
          name: 'Aguas Termales',
          price: '$55',
          level: 'Relajado',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300',
          description: 'Relájate en piscinas naturales de agua caliente'
        }
      ]
    }
  },

  // Obtener un tour por ID
  async getTourById(id) {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching tour:', error.message)
      throw error
    }
  },

  // Crear un nuevo tour (admin)
  async createTour(tour) {
    try {
      const { data, error } = await supabase
        .from('tours')
        .insert([tour])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating tour:', error.message)
      throw error
    }
  },

  // Actualizar tour (admin)
  async updateTour(id, tour) {
    try {
      const { data, error } = await supabase
        .from('tours')
        .update(tour)
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error updating tour:', error.message)
      throw error
    }
  },

  // Eliminar tour (admin)
  async deleteTour(id) {
    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting tour:', error.message)
      throw error
    }
  }
}

export const bookingService = {
  // Crear una reserva
  async createBooking(booking) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error creating booking:', error.message)
      throw error
    }
  },

  // Obtener reserva por token
  async getBookingByToken(token) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('confirmation_token', token)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching booking:', error.message)
      throw error
    }
  },

  // Confirmar reserva
  async confirmBooking(bookingId) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed',
          confirmed_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error confirming booking:', error.message)
      throw error
    }
  },

  // Obtener reservas de un usuario (admin)
  async getBookingsByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching bookings:', error.message)
      throw error
    }
  },

  // Obtener todas las reservas (admin)
  async getAllBookings() {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching all bookings:', error.message)
      throw error
    }
  }
}
