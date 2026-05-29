import { NextResponse } from 'next/server'
import { adminSessionCookieName } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const response = NextResponse.redirect(new URL('/admin/reservas', request.url), { status: 303 })

  response.cookies.set(adminSessionCookieName, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin/reservas',
    maxAge: 0
  })

  return response
}
