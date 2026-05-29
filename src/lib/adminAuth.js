import crypto from 'crypto'

export const adminSessionCookieName = 'miravalles_admin_session'

export function isAdminConfigured() {
  return Boolean(getAdminToken())
}

export function getAdminToken() {
  return String(process.env.ADMIN_ACCESS_TOKEN || '').trim()
}

export function createAdminSessionValue() {
  const adminToken = getAdminToken()
  if (!adminToken) return null

  return crypto
    .createHmac('sha256', adminToken)
    .update('miravalles-expedition-admin-session-v1')
    .digest('hex')
}

export function isValidAdminSession(value) {
  const expected = createAdminSessionValue()
  if (!expected || !value) return false

  const expectedBuffer = Buffer.from(expected)
  const valueBuffer = Buffer.from(String(value))

  return expectedBuffer.length === valueBuffer.length && crypto.timingSafeEqual(expectedBuffer, valueBuffer)
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin/reservas',
    maxAge: 60 * 60 * 8
  }
}
