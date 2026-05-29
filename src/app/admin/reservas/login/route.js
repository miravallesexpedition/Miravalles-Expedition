import { NextResponse } from 'next/server'
import {
  adminCookieOptions,
  adminSessionCookieName,
  createAdminSessionValue,
  getAdminToken
} from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const adminToken = getAdminToken()
  const adminUrl = new URL('/admin/reservas', request.url)

  if (!adminToken) {
    adminUrl.searchParams.set('error', 'config')
    return NextResponse.redirect(adminUrl, { status: 303 })
  }

  const formData = await request.formData()
  const password = String(formData.get('password') || '')

  if (password !== adminToken) {
    adminUrl.searchParams.set('error', 'invalid')
    return NextResponse.redirect(adminUrl, { status: 303 })
  }

  const response = NextResponse.redirect(adminUrl, { status: 303 })
  response.cookies.set(adminSessionCookieName, createAdminSessionValue(), adminCookieOptions())

  return response
}
