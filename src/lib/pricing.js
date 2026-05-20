export const CUSTOMER_TYPES = {
  foreign: 'foreign',
  national: 'national'
}

export function normalizeCustomerType(value) {
  return value === CUSTOMER_TYPES.national ? CUSTOMER_TYPES.national : CUSTOMER_TYPES.foreign
}

export function getTourQuote(tour, customerType = CUSTOMER_TYPES.foreign) {
  const normalizedType = normalizeCustomerType(customerType)

  if (normalizedType === CUSTOMER_TYPES.national) {
    const rawNationalPrice = tour?.pricing?.nationalAdult
    const unitPrice = parseMoney(rawNationalPrice)

    return {
      customerType: normalizedType,
      currency: 'CRC',
      unitPrice,
      priceLabel: rawNationalPrice || 'Consultar',
      canPayOnline: false
    }
  }

  const rawForeignPrice = tour?.pricing?.foreignAdult || tour?.priceLabel || `$${tour?.price || 0}`
  const unitPrice = parseMoney(rawForeignPrice) ?? Number(tour?.price || 0)

  return {
    customerType: normalizedType,
    currency: 'USD',
    unitPrice,
    priceLabel: rawForeignPrice || formatMoney(unitPrice, 'USD'),
    canPayOnline: true
  }
}

export function calculateBookingTotal(tours, participantsCount, customerType = CUSTOMER_TYPES.foreign) {
  const items = Array.isArray(tours) ? tours : [tours]
  const people = Math.max(1, Number(participantsCount || 1))
  const quotes = items.map((tour) => getTourQuote(tour, customerType))
  const currency = quotes[0]?.currency || 'USD'
  const hasUnavailablePrice = quotes.some((quote) => !Number.isFinite(quote.unitPrice))

  if (hasUnavailablePrice || quotes.some((quote) => quote.currency !== currency)) {
    return {
      currency,
      participantsCount: people,
      unitSubtotal: null,
      total: null,
      label: 'Consultar'
    }
  }

  const unitSubtotal = quotes.reduce((sum, quote) => sum + quote.unitPrice, 0)
  const total = unitSubtotal * people

  return {
    currency,
    participantsCount: people,
    unitSubtotal,
    total,
    label: formatMoney(total, currency)
  }
}

export function parseMoney(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (!value) return null

  const text = String(value)
  if (/consultar|no recomendado/i.test(text)) return null

  if (text.includes('₡') || /\d{1,3}(?:\.\d{3})+/.test(text)) {
    const digits = text.replace(/[^\d]/g, '')
    return digits ? Number(digits) : null
  }

  const match = text.match(/\d+(?:[.,]\d+)?/)
  if (!match) return null

  return Number(match[0].replace(',', '.'))
}

export function formatMoney(amount, currency = 'USD') {
  const value = Number(amount)
  if (!Number.isFinite(value)) return 'Consultar'

  if (currency === 'CRC') {
    return `₡${Math.round(value).toLocaleString('de-DE')}`
  }

  return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`
}
