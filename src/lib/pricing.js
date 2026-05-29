export const CUSTOMER_TYPES = {
  foreign: 'foreign',
  national: 'national'
}

export function normalizeCustomerType(value) {
  return value === CUSTOMER_TYPES.national ? CUSTOMER_TYPES.national : CUSTOMER_TYPES.foreign
}

export function getTourQuote(tour, customerType = CUSTOMER_TYPES.foreign) {
  const normalizedType = normalizeCustomerType(customerType)
  const rawGeneralPrice = tour?.pricing?.general

  if (normalizedType === CUSTOMER_TYPES.national) {
    const rawNationalPrice = tour?.pricing?.nationalAdult || rawGeneralPrice
    const unitPrice = parseMoney(rawNationalPrice)
    const currency = tour?.pricing?.nationalCurrency || getCurrencyFromPrice(rawNationalPrice, rawGeneralPrice ? 'USD' : 'CRC')

    return {
      customerType: normalizedType,
      currency,
      unitPrice,
      priceLabel: rawNationalPrice || 'Consultar',
      canPayOnline: currency === 'USD'
    }
  }

  const rawForeignPrice = tour?.pricing?.foreignAdult || rawGeneralPrice || tour?.priceLabel || `$${tour?.price || 0}`
  const parsedPrice = parseMoney(rawForeignPrice)
  const unitPrice = parsedPrice ?? (rawForeignPrice ? null : Number(tour?.price || 0))
  const currency = tour?.pricing?.foreignCurrency || getCurrencyFromPrice(rawForeignPrice, 'USD')

  return {
    customerType: normalizedType,
    currency,
    unitPrice,
    priceLabel: rawForeignPrice || formatMoney(unitPrice, currency),
    canPayOnline: currency === 'USD'
  }
}

export function getTourChildQuote(tour, customerType = CUSTOMER_TYPES.foreign) {
  const normalizedType = normalizeCustomerType(customerType)
  const rawGeneralPrice = tour?.pricing?.general

  if (normalizedType === CUSTOMER_TYPES.national) {
    const rawChildPrice = tour?.pricing?.nationalChild || tour?.pricing?.nationalAdult || rawGeneralPrice
    const unitPrice = parseMoney(rawChildPrice)
    const currency = tour?.pricing?.nationalCurrency || getCurrencyFromPrice(rawChildPrice, rawGeneralPrice ? 'USD' : 'CRC')

    return {
      customerType: normalizedType,
      currency,
      unitPrice,
      priceLabel: rawChildPrice || 'Consultar',
      canPayOnline: currency === 'USD'
    }
  }

  const rawChildPrice = tour?.pricing?.foreignChild || tour?.pricing?.foreignAdult || rawGeneralPrice || tour?.priceLabel || `$${tour?.price || 0}`
  const parsedPrice = parseMoney(rawChildPrice)
  const unitPrice = parsedPrice ?? (rawChildPrice ? null : Number(tour?.price || 0))
  const currency = tour?.pricing?.foreignCurrency || getCurrencyFromPrice(rawChildPrice, 'USD')

  return {
    customerType: normalizedType,
    currency,
    unitPrice,
    priceLabel: rawChildPrice || formatMoney(unitPrice, currency),
    canPayOnline: currency === 'USD'
  }
}

export function calculateBookingTotal(tours, participantsCount, customerType = CUSTOMER_TYPES.foreign, childrenCount = 0) {
  const items = Array.isArray(tours) ? tours : [tours]
  const people = Math.max(1, Number(participantsCount || 1))
  const children = Math.min(people, Math.max(0, Number(childrenCount || 0)))
  const adults = Math.max(0, people - children)
  const quotes = items.flatMap((tour) => [getTourQuote(tour, customerType), getTourChildQuote(tour, customerType)])
  const currency = quotes[0]?.currency || 'USD'
  const hasUnavailablePrice = quotes.some((quote) => !Number.isFinite(quote.unitPrice))

  if (hasUnavailablePrice || quotes.some((quote) => quote.currency !== currency)) {
    return {
      currency,
      participantsCount: people,
      adultsCount: adults,
      childrenCount: children,
      unitSubtotal: null,
      total: null,
      label: 'Consultar'
    }
  }

  const unitSubtotal = items.reduce((sum, tour) => {
    const adultQuote = getTourQuote(tour, customerType)
    const childQuote = getTourChildQuote(tour, customerType)
    return sum + (adultQuote.unitPrice * adults) + (childQuote.unitPrice * children)
  }, 0)
  const total = unitSubtotal

  return {
    currency,
    participantsCount: people,
    adultsCount: adults,
    childrenCount: children,
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

function getCurrencyFromPrice(value, fallback = 'USD') {
  const text = String(value || '')
  if (text.includes('$')) return 'USD'
  if (text.includes('₡')) return 'CRC'
  if (/\d{1,3}(?:\.\d{3})+/.test(text)) return 'CRC'
  return fallback
}

export function formatMoney(amount, currency = 'USD') {
  const value = Number(amount)
  if (!Number.isFinite(value)) return 'Consultar'

  if (currency === 'CRC') {
    return `₡${Math.round(value).toLocaleString('de-DE')}`
  }

  return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`
}
