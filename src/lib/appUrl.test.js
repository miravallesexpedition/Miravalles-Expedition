import { afterEach, describe, expect, it, vi } from 'vitest'
import { getAppUrl, publicAppUrl } from './appUrl'

describe('getAppUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses the configured public app URL without trailing slashes', () => {
    vi.stubEnv('NEXT_PUBLIC_APP_URL', 'https://example.com///')

    expect(getAppUrl('http://localhost:3000/api/bookings')).toBe('https://example.com')
  })

  it('uses the request origin when no app URL is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_APP_URL', '')

    expect(getAppUrl('https://miravallesexpedition.com/api/bookings')).toBe('https://miravallesexpedition.com')
  })

  it('falls back to the public domain without a request URL', () => {
    vi.stubEnv('NEXT_PUBLIC_APP_URL', '')

    expect(getAppUrl()).toBe(publicAppUrl)
  })
})
