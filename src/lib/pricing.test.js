import { describe, expect, it } from 'vitest'
import {
  calculateBookingTotal,
  formatMoney,
  getTourChildQuote,
  getTourQuote,
  parseMoney
} from './pricing'

const sampleTour = {
  price: 45,
  priceLabel: '$45',
  pricing: {
    foreignAdult: '$45',
    foreignChild: '$35',
    nationalAdult: '₡10.000',
    nationalChild: '₡8.000'
  }
}

describe('pricing', () => {
  it('calculates foreign adult and child totals in USD', () => {
    const total = calculateBookingTotal(sampleTour, 3, 'foreign', 1)

    expect(total).toMatchObject({
      currency: 'USD',
      participantsCount: 3,
      adultsCount: 2,
      childrenCount: 1,
      total: 125,
      label: '$125'
    })
  })

  it('calculates national adult and child totals in CRC', () => {
    const total = calculateBookingTotal(sampleTour, 3, 'national', 1)

    expect(total).toMatchObject({
      currency: 'CRC',
      total: 28000,
      label: '₡28.000'
    })
  })

  it('marks consult-only prices as unavailable', () => {
    const quote = getTourQuote({ pricing: { foreignAdult: 'Consultar' } }, 'foreign')

    expect(quote.unitPrice).toBeNull()
    expect(calculateBookingTotal({ pricing: { foreignAdult: 'Consultar' } }, 2).label).toBe('Consultar')
  })

  it('falls back child price to adult price when no child price exists', () => {
    const quote = getTourChildQuote({ pricing: { foreignAdult: '$95' } }, 'foreign')

    expect(quote.unitPrice).toBe(95)
    expect(quote.currency).toBe('USD')
  })

  it('parses and formats supported money values', () => {
    expect(parseMoney('$45')).toBe(45)
    expect(parseMoney('₡10.000')).toBe(10000)
    expect(formatMoney(12.5, 'USD')).toBe('$12.50')
    expect(formatMoney(10000, 'CRC')).toBe('₡10.000')
  })
})
