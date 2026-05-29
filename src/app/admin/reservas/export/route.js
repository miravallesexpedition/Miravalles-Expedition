import { cookies } from 'next/headers'
import { adminSessionCookieName, isAdminConfigured, isValidAdminSession } from '@/lib/adminAuth'
import {
  buildBookingsCsv,
  filterAdminBookings,
  normalizeAdminBookingFilters
} from '@/lib/adminBookings'
import { bookingService } from '@/lib/services'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(adminSessionCookieName)?.value

  if (!isAdminConfigured() || !isValidAdminSession(sessionCookie)) {
    return Response.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const filters = normalizeAdminBookingFilters(Object.fromEntries(searchParams.entries()))
  const bookings = filterAdminBookings(await bookingService.getRecentBookings(500), filters)
  const csv = buildBookingsCsv(bookings)
  const stamp = new Date().toISOString().slice(0, 10)

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="reservas-miravalles-${stamp}.csv"`,
      'Cache-Control': 'no-store'
    }
  })
}
