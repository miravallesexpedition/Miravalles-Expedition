import { describe, expect, it, vi } from 'vitest'
import {
  adminCookieOptions,
  createAdminSessionValue,
  isAdminConfigured,
  isValidAdminSession
} from './adminAuth'

describe('adminAuth', () => {
  it('creates and validates a stable session value from the admin token', () => {
    vi.stubEnv('ADMIN_ACCESS_TOKEN', 'super-secret')

    const session = createAdminSessionValue()

    expect(isAdminConfigured()).toBe(true)
    expect(session).toHaveLength(64)
    expect(isValidAdminSession(session)).toBe(true)
    expect(isValidAdminSession('wrong')).toBe(false)

    vi.unstubAllEnvs()
  })

  it('uses httpOnly lax cookies scoped to the admin route', () => {
    expect(adminCookieOptions()).toMatchObject({
      httpOnly: true,
      sameSite: 'lax',
      path: '/admin/reservas',
      maxAge: 28800
    })
  })
})
