import { formatMoney } from './pricing'
import { tours } from './siteConfig'
import { formatBookingTime } from './timeSlots'

function stringValue(value) {
  if (Array.isArray(value)) return String(value[0] || '').trim()
  return String(value || '').trim()
}

export function normalizeAdminBookingFilters(params = {}) {
  return {
    tourDate: stringValue(params.tourDate),
    tourId: stringValue(params.tourId),
    paymentStatus: stringValue(params.paymentStatus),
    status: stringValue(params.status),
    q: stringValue(params.q)
  }
}

export function buildAdminBookingsQuery(filters) {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(filters || {})) {
    if (value) query.set(key, value)
  }

  return query.toString()
}

export function getBookingTour(booking) {
  return tours.find((tour) => String(tour.id) === String(booking.tour_id)) || null
}

export function getCustomerName(booking) {
  return `${booking.first_name || ''} ${booking.last_name || ''}`.trim() || 'Cliente'
}

export function filterAdminBookings(bookings, filters) {
  const query = String(filters.q || '').toLowerCase()

  return (bookings || []).filter((booking) => {
    const tour = getBookingTour(booking)
    const customerName = getCustomerName(booking)
    const haystack = [
      booking.id,
      booking.email,
      booking.phone,
      customerName,
      tour?.name,
      tour?.shortName,
      booking.special_requests
    ].filter(Boolean).join(' ').toLowerCase()

    if (filters.tourDate && String(booking.tour_date) !== filters.tourDate) return false
    if (filters.tourId && String(booking.tour_id) !== filters.tourId) return false
    if (filters.paymentStatus && String(booking.payment_status || 'pending') !== filters.paymentStatus) return false
    if (filters.status && String(booking.status || 'pending') !== filters.status) return false
    if (query && !haystack.includes(query)) return false

    return true
  })
}

export function formatAdminDate(value) {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-CR', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(`${value}T12:00:00-06:00`))
}

export function normalizeWhatsAppNumber(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (!digits) return null
  if (digits.length === 8) return `506${digits}`
  return digits
}

export function buildCustomerMessage(booking) {
  const tour = getBookingTour(booking)
  const total = formatMoney(booking.total_price, booking.currency || 'USD')

  return [
    `Hola ${getCustomerName(booking)}, te escribimos de Miravalles Expedition sobre tu reserva.`,
    `Tour: ${tour?.shortName || tour?.name || booking.tour_id}`,
    `Fecha: ${formatAdminDate(booking.tour_date)}`,
    `Hora: ${formatBookingTime(booking.preferred_time || 'Por confirmar')}`,
    `Participantes: ${booking.participants_count || 1}`,
    `Total: ${total}`
  ].join('\n')
}

export function buildCustomerWhatsAppUrl(booking) {
  const number = normalizeWhatsAppNumber(booking.phone)
  if (!number) return null

  return `https://wa.me/${number}?text=${encodeURIComponent(buildCustomerMessage(booking))}`
}

export function buildCustomerMailtoUrl(booking) {
  if (!booking.email) return null

  return `mailto:${booking.email}?subject=${encodeURIComponent('Reserva Miravalles Expedition')}&body=${encodeURIComponent(buildCustomerMessage(booking))}`
}

function csvValue(value) {
  const text = String(value ?? '')
  return `"${text.replaceAll('"', '""')}"`
}

export function buildBookingsCsv(bookings) {
  const headers = [
    'id',
    'creado_el',
    'tour',
    'fecha_tour',
    'hora_preferida',
    'cliente',
    'tipo_cliente',
    'correo',
    'teléfono',
    'participantes',
    'moneda',
    'total',
    'estado_pago',
    'estado_reserva',
    'notas'
  ]

  const rows = (bookings || []).map((booking) => {
    const tour = getBookingTour(booking)
    return [
      booking.id,
      booking.created_at,
      tour?.shortName || tour?.name || booking.tour_id,
      booking.tour_date,
      formatBookingTime(booking.preferred_time || ''),
      getCustomerName(booking),
      booking.customer_type,
      booking.email,
      booking.phone,
      booking.participants_count,
      booking.currency,
      booking.total_price,
      booking.payment_status || 'pending',
      booking.status || 'pending',
      booking.special_requests
    ].map(csvValue).join(',')
  })

  return [headers.join(','), ...rows].join('\n')
}
