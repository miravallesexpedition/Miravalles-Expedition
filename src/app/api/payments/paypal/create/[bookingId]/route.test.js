import { describe, expect, it } from 'vitest'
import { GET } from './route'

describe('PayPal create order route', () => {
  it('does not allow GET to create a PayPal order', async () => {
    const response = await GET()
    const payload = await response.json()

    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('POST')
    expect(payload.error).toContain('POST')
  })
})
