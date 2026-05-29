import Link from 'next/link'
import { cookies } from 'next/headers'
import { bookingService } from '@/lib/services'
import { tours } from '@/lib/siteConfig'
import { formatMoney } from '@/lib/pricing'
import { formatBookingTime } from '@/lib/timeSlots'
import { adminSessionCookieName, isAdminConfigured, isValidAdminSession } from '@/lib/adminAuth'
import {
  buildAdminBookingsQuery,
  buildCustomerMailtoUrl,
  buildCustomerWhatsAppUrl,
  filterAdminBookings,
  formatAdminDate,
  getBookingTour,
  getCustomerName,
  normalizeAdminBookingFilters
} from '@/lib/adminBookings'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Panel de reservas',
  robots: {
    index: false,
    follow: false
  }
}

export default async function AdminBookingsPage({ searchParams }) {
  const params = await searchParams
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(adminSessionCookieName)?.value

  if (!isAdminConfigured()) {
    return <SetupState />
  }

  if (!isValidAdminSession(sessionCookie)) {
    return <LoginState error={params?.error} />
  }

  const filters = normalizeAdminBookingFilters(params)
  const allBookings = await bookingService.getRecentBookings(500)
  const bookings = filterAdminBookings(allBookings, filters)
  const exportQuery = buildAdminBookingsQuery(filters)
  const exportHref = `/admin/reservas/export${exportQuery ? `?${exportQuery}` : ''}`

  return (
    <main id="contenido-principal" className="min-h-screen bg-[#f8f4ea] px-4 py-10 text-[#11130f] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Administración
            </p>
            <h1 className="mt-3 text-4xl font-black">Reservas recientes</h1>
            <p className="mt-2 text-gray-700">
              Vista rápida para revisar clientes, fecha, hora, estado de pago y notas.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="rounded-full bg-[#071d14] px-5 py-3 text-center font-black text-white">
              Volver al sitio
            </Link>
            <form action="/admin/reservas/logout" method="post">
              <button className="w-full rounded-full border border-black/15 px-5 py-3 text-center font-black text-[#071d14] sm:w-auto">
                Salir
              </button>
            </form>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Mostradas" value={bookings.length} />
          <Metric label="Total recientes" value={allBookings.length} />
          <Metric label="Confirmadas" value={bookings.filter((booking) => booking.status === 'confirmed').length} />
          <Metric label="Pagadas" value={bookings.filter((booking) => booking.payment_status === 'completed').length} />
        </div>

        <FilterPanel filters={filters} exportHref={exportHref} />

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.15fr_1.15fr_0.75fr_0.65fr_0.75fr_1.15fr_0.9fr] gap-4 border-b border-black/10 bg-[#071d14] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white/70 lg:grid">
            <span>Cliente</span>
            <span>Tour</span>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Pago</span>
            <span>Contacto</span>
            <span>Acciones</span>
          </div>

          <div className="divide-y divide-black/10">
            {bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
            {!bookings.length && (
              <p className="p-8 text-center text-gray-600">
                No hay reservas con esos filtros.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function LoginState({ error }) {
  return (
    <main id="contenido-principal" className="flex min-h-screen items-center justify-center bg-[#071d14] px-4 text-white">
      <section className="w-full max-w-md rounded-[1.5rem] bg-white p-8 text-[#11130f] shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">
          Panel privado
        </p>
        <h1 className="mt-3 text-3xl font-black">Ingresar a reservas</h1>
        <p className="mt-3 text-sm leading-7 text-gray-700">
          Escribí la clave de administración para revisar reservas. La clave se configura en Vercel como variable privada.
        </p>
        {error === 'invalid' && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            Clave incorrecta. Intentá de nuevo.
          </p>
        )}
        <form action="/admin/reservas/login" method="post" className="mt-6 space-y-4">
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-2xl border border-black/10 px-4 py-3"
            placeholder="Clave de administración"
          />
          <button className="w-full rounded-full bg-[#071d14] px-5 py-3 font-black text-white">
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

function SetupState() {
  return (
    <main id="contenido-principal" className="flex min-h-screen items-center justify-center bg-[#f8f4ea] px-4 text-[#11130f]">
      <section className="w-full max-w-2xl rounded-[1.5rem] bg-white p-8 shadow-xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-green-800">
          Configuración pendiente
        </p>
        <h1 className="mt-3 text-3xl font-black">Activá el panel de reservas</h1>
        <p className="mt-3 leading-7 text-gray-700">
          Falta configurar la variable privada <strong>ADMIN_ACCESS_TOKEN</strong> en Vercel. Cuando esté lista, esta página mostrará las reservas recientes de forma protegida.
        </p>
      </section>
    </main>
  )
}

function Metric({ label, value }) {
  return (
    <article className="rounded-[1.25rem] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-green-800">{value}</p>
    </article>
  )
}

function FilterPanel({ filters, exportHref }) {
  return (
    <section className="mt-8 rounded-[1.25rem] border border-black/10 bg-white p-5 shadow-sm">
      <form action="/admin/reservas" className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr_1fr_1.2fr_auto] lg:items-end">
        <Field label="Fecha">
          <input
            type="date"
            name="tourDate"
            defaultValue={filters.tourDate}
            className="w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </Field>
        <Field label="Tour">
          <select name="tourId" defaultValue={filters.tourId} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3">
            <option value="">Todos</option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.id}>{tour.shortName || tour.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Pago">
          <select name="paymentStatus" defaultValue={filters.paymentStatus} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3">
            <option value="">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Pagado</option>
            <option value="failed">Fallido</option>
          </select>
        </Field>
        <Field label="Reserva">
          <select name="status" defaultValue={filters.status} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3">
            <option value="">Todas</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmada</option>
            <option value="cancelled">Cancelada</option>
            <option value="completed">Completada</option>
          </select>
        </Field>
        <Field label="Buscar">
          <input
            type="search"
            name="q"
            defaultValue={filters.q}
            placeholder="Nombre, correo, teléfono"
            className="w-full rounded-2xl border border-black/10 px-4 py-3"
          />
        </Field>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
          <button className="rounded-full bg-[#071d14] px-5 py-3 font-black text-white">
            Filtrar
          </button>
          <Link href="/admin/reservas" className="rounded-full border border-black/15 px-5 py-3 text-center font-black text-[#071d14]">
            Limpiar
          </Link>
        </div>
      </form>
      <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          Usa los filtros para preparar llamadas, revisar pagos pendientes o exportar una lista limpia.
        </p>
        <Link href={exportHref} className="rounded-full bg-green-700 px-5 py-3 text-center font-black text-white">
          Exportar CSV
        </Link>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-gray-500">{label}</span>
      {children}
    </label>
  )
}

function BookingRow({ booking }) {
  const tour = getBookingTour(booking)
  const customerName = getCustomerName(booking)
  const currency = booking.currency || 'USD'
  const whatsappUrl = buildCustomerWhatsAppUrl(booking)
  const mailtoUrl = buildCustomerMailtoUrl(booking)

  return (
    <article className="grid gap-4 p-5 text-sm lg:grid-cols-[1.15fr_1.15fr_0.75fr_0.65fr_0.75fr_1.15fr_0.9fr] lg:items-center">
      <div>
        <p className="font-black">{customerName}</p>
        <p className="mt-1 text-gray-600">{booking.customer_type === 'national' ? 'Nacional/residente' : 'Extranjero'}</p>
      </div>
      <div>
        <p className="font-bold">{tour?.shortName || tour?.name || booking.tour_id}</p>
        <p className="mt-1 text-gray-600">{formatMoney(booking.total_price, currency)}</p>
      </div>
      <p>{formatAdminDate(booking.tour_date)}</p>
      <p>{formatBookingTime(booking.preferred_time || 'Por confirmar')}</p>
      <div>
        <StatusPill value={booking.payment_status || 'pending'} />
        <p className="mt-1 text-xs text-gray-500">{formatReservationStatus(booking.status)}</p>
      </div>
      <div>
        <a className="font-bold text-green-800" href={`mailto:${booking.email}`}>{booking.email}</a>
        <p className="mt-1 text-gray-600">{booking.phone || 'Sin teléfono'}</p>
        {booking.special_requests && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-500">{booking.special_requests}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-full bg-green-700 px-3 py-2 text-center text-xs font-black text-white">
            WhatsApp
          </a>
        )}
        {mailtoUrl && (
          <a href={mailtoUrl} className="rounded-full border border-black/15 px-3 py-2 text-center text-xs font-black text-[#071d14]">
            Correo
          </a>
        )}
      </div>
    </article>
  )
}

function StatusPill({ value }) {
  const label = value === 'completed' ? 'Pagado' : value === 'failed' ? 'Falló' : 'Pendiente'
  const style = value === 'completed'
    ? 'bg-green-100 text-green-800'
    : value === 'failed'
      ? 'bg-red-100 text-red-800'
      : 'bg-amber-100 text-amber-800'

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${style}`}>
      {label}
    </span>
  )
}

function formatReservationStatus(value) {
  const labels = {
    pending: 'Reserva pendiente',
    confirmed: 'Reserva confirmada',
    completed: 'Reserva completada',
    cancelled: 'Reserva cancelada'
  }

  return labels[value] || 'Reserva pendiente'
}
