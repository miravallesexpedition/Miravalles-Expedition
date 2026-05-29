import { describe, expect, it, vi } from 'vitest'
import {
  countBookedParticipantsForSlot,
  createConfirmationExpiryDate,
  getCapacityForTour,
  getConfirmationExpiryHours,
  getSlotAvailability,
  isConfirmationExpired
} from './bookingRules'

describe('bookingRules', () => {
  it('creates confirmation expiry from configured hours', () => {
    vi.stubEnv('BOOKING_CONFIRMATION_EXPIRES_HOURS', '2')

    const now = new Date('2026-05-28T12:00:00.000Z')

    expect(getConfirmationExpiryHours()).toBe(2)
    expect(createConfirmationExpiryDate(now).toISOString()).toBe('2026-05-28T14:00:00.000Z')

    vi.unstubAllEnvs()
  })

  it('detects expired pending confirmations but not confirmed bookings', () => {
    const now = new Date('2026-05-28T12:00:00.000Z')

    expect(isConfirmationExpired({
      status: 'pending',
      confirmation_expires_at: '2026-05-28T11:59:59.000Z'
    }, now)).toBe(true)

    expect(isConfirmationExpired({
      status: 'confirmed',
      confirmation_expires_at: '2026-05-28T11:59:59.000Z'
    }, now)).toBe(false)
  })

  it('counts only participants in the selected time slot', () => {
    const booked = countBookedParticipantsForSlot([
      { preferred_time: '07:00', participants_count: 2 },
      { preferred_time: '07:00', participants_count: 3 },
      { preferred_time: '08:00', participants_count: 10 }
    ], '07:00')

    expect(booked).toBe(5)
  })

  it('uses tour-specific hot springs capacity', () => {
    vi.stubEnv('MAX_PARTICIPANTS_PER_TOUR', '10')
    vi.stubEnv('MAX_PARTICIPANTS_HOT_SPRINGS', '30')

    expect(getCapacityForTour('catarata-cabro-muco-morpho-blanca')).toBe(10)
    expect(getCapacityForTour('aguas-termales-miravalles')).toBe(30)

    vi.unstubAllEnvs()
  })

  it('returns remaining availability for a slot', async () => {
    vi.stubEnv('MAX_PARTICIPANTS_PER_TOUR', '6')

    const bookingService = {
      getBookingsForDate: vi.fn().mockResolvedValue([
        { preferred_time: '07:00', participants_count: 2 },
        { preferred_time: '07:00', participants_count: 3 }
      ])
    }

    await expect(getSlotAvailability(
      bookingService,
      'catarata-cabro-muco-morpho-blanca',
      '2026-06-01',
      '07:00'
    )).resolves.toMatchObject({
      capacity: 6,
      booked: 5,
      remaining: 1,
      available: true
    })

    vi.unstubAllEnvs()
  })
})
