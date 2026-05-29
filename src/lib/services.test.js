import { describe, expect, it } from 'vitest'
import { bookingService } from './services'

describe('bookingService fallback payments', () => {
  it('marks a payment completed only once', async () => {
    const booking = await bookingService.createBooking({
      tour_id: 'catarata-cabro-muco-morpho-blanca',
      email: 'client@example.com',
      first_name: 'Client',
      last_name: 'Test',
      participants_count: 2,
      tour_date: '2026-06-01',
      status: 'confirmed',
      confirmation_token: `token-${Date.now()}`
    })

    const firstUpdate = await bookingService.markPaymentCompletedOnce(booking.id, 'CAPTURE-1', {
      paypalOrderId: 'ORDER-1'
    })
    const secondUpdate = await bookingService.markPaymentCompletedOnce(booking.id, 'CAPTURE-1', {
      paypalOrderId: 'ORDER-1'
    })

    expect(firstUpdate.wasAlreadyCompleted).toBe(false)
    expect(firstUpdate.booking.payment_status).toBe('completed')
    expect(secondUpdate.wasAlreadyCompleted).toBe(true)
    expect(secondUpdate.booking.paypal_capture_id).toBe('CAPTURE-1')
  })
})
