const tours = [
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

const bookings = []

const getTourData = () => tours

export const tourService = {
  async getAllTours() {
    return getTourData()
  },

  async getTourById(id) {
    return tours.find((tour) => String(tour.id) === String(id)) || null
  },

  async createTour(tour) {
    const newTour = {
      id: String(Date.now()),
      ...tour
    }
    tours.push(newTour)
    return newTour
  },

  async updateTour(id, tour) {
    const index = tours.findIndex((item) => String(item.id) === String(id))
    if (index === -1) return null
    tours[index] = { ...tours[index], ...tour }
    return tours[index]
  },

  async deleteTour(id) {
    const index = tours.findIndex((item) => String(item.id) === String(id))
    if (index === -1) return false
    tours.splice(index, 1)
    return true
  }
}

export const bookingService = {
  async createBooking(booking) {
    const newBooking = {
      id: String(Date.now()),
      status: 'pending',
      confirmed_at: null,
      ...booking
    }
    bookings.push(newBooking)
    return newBooking
  },

  async getBookingByToken(token) {
    return bookings.find((item) => item.confirmation_token === token) || null
  },

  async confirmBooking(bookingId) {
    const booking = bookings.find((item) => String(item.id) === String(bookingId))
    if (!booking) return null
    booking.status = 'confirmed'
    booking.confirmed_at = new Date().toISOString()
    return booking
  },

  async getBookingsByEmail(email) {
    return bookings.filter((item) => item.email === email)
  },

  async getAllBookings() {
    return bookings
  }
}
