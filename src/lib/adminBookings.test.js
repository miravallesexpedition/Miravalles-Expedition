import { describe, expect, it } from 'vitest'
import {
  buildAdminBookingsQuery,
  buildBookingsCsv,
  buildCustomerWhatsAppUrl,
  filterAdminBookings,
  normalizeAdminBookingFilters,
  normalizeWhatsAppNumber
} from './adminBookings'

const bookings = [
  {
    id: '1',
    tour_id: 'catarata-cabro-muco-morpho-blanca',
    first_name: 'Ana',
    last_name: 'Lopez',
    email: 'ana@example.com',
    phone: '7006-3382',
    tour_date: '2026-06-01',
    preferred_time: '07:00',
    participants_count: 2,
    currency: 'USD',
    total_price: 90,
    payment_status: 'completed',
    status: 'confirmed'
  },
  {
    id: '2',
    tour_id: 'aguas-termales-miravalles',
    first_name: 'Luis',
    last_name: 'Mora',
    email: 'luis@example.com',
    phone: '+506 8888 0000',
    tour_date: '2026-06-02',
    preferred_time: '15:00',
    participants_count: 1,
    currency: 'USD',
    total_price: 15,
    payment_status: 'pending',
    status: 'pending'
  }
]

describe('adminBookings', () => {
  it('normalizes filters and builds query strings without empty values', () => {
    const filters = normalizeAdminBookingFilters({
      tourDate: '2026-06-01',
      tourId: '',
      q: ['Ana']
    })

    expect(filters).toMatchObject({ tourDate: '2026-06-01', q: 'Ana' })
    expect(buildAdminBookingsQuery(filters)).toBe('tourDate=2026-06-01&q=Ana')
  })

  it('filters bookings by date, payment status and search text', () => {
    expect(filterAdminBookings(bookings, {
      tourDate: '2026-06-01',
      paymentStatus: 'completed',
      q: 'ana'
    })).toHaveLength(1)
  })

  it('normalizes Costa Rica phone numbers for WhatsApp', () => {
    expect(normalizeWhatsAppNumber('7006-3382')).toBe('50670063382')
    expect(normalizeWhatsAppNumber('+506 8888 0000')).toBe('50688880000')
  })

  it('builds customer WhatsApp and CSV output', () => {
    expect(buildCustomerWhatsAppUrl(bookings[0])).toContain('https://wa.me/50670063382')

    const csv = buildBookingsCsv([bookings[0]])

    expect(csv).toContain('"ana@example.com"')
    expect(csv).toContain('"completed"')
  })
})
