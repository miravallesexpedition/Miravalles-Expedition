import Link from 'next/link'
import { bookingService } from '@/lib/services'
import { tours } from '@/lib/siteConfig'
import { formatMoney } from '@/lib/pricing'
import { formatBookingTime } from '@/lib/timeSlots'

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
  const token = params?.token || ''
  const adminToken = process.env.ADMIN_ACCESS_TOKEN

  if (!adminToken) {
    return <SetupState />
  }

  if (token !== adminToken) {
    return <LoginState />
  }

  const bookings = await bookingService.getRecentBookings(100)

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
          <Link href="/" className="rounded-full bg-[#071d14] px-5 py-3 text-center font-black text-white">
            Volver al sitio
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric label="Reservas" value={bookings.length} />
          <Metric label="Confirmadas" value={bookings.filter((booking) => booking.status === 'confirmed').length} />
          <Metric label="Pagadas" value={bookings.filter((booking) => booking.payment_status === 'completed').length} />
          <Metric label="Pendientes" value={bookings.filter((booking) => booking.payment_status !== 'completed').length} />
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.2fr_1.1fr_0.8fr_0.8fr_0.8fr_1fr] gap-4 border-b border-black/10 bg-[#071d14] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white/70 lg:grid">
            <span>Cliente</span>
            <span>Tour</span>
            <span>Fecha</span>
            <span>Hora</span>
            <span>Pago</span>
            <span>Contacto</span>
          </div>

          <div className="divide-y divide-black/10">
            {bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
            {!bookings.length && (
              <p className="p-8 text-center text-gray-600">
                Todavía no hay reservas registradas.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function LoginState() {
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
        <form action="/admin/reservas" className="mt-6 space-y-4">
          <input
            name="token"
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

function BookingRow({ booking }) {
  const tour = tours.find((item) => item.id === booking.tour_id)
  const customerName = `${booking.first_name || ''} ${booking.last_name || ''}`.trim() || 'Cliente'
  const currency = booking.currency || 'USD'

  return (
    <article className="grid gap-4 p-5 text-sm lg:grid-cols-[1.2fr_1.1fr_0.8fr_0.8fr_0.8fr_1fr] lg:items-center">
      <div>
        <p className="font-black">{customerName}</p>
        <p className="mt-1 text-gray-600">{booking.customer_type === 'national' ? 'Nacional/residente' : 'Extranjero'}</p>
      </div>
      <div>
        <p className="font-bold">{tour?.shortName || tour?.name || booking.tour_id}</p>
        <p className="mt-1 text-gray-600">{formatMoney(booking.total_price, currency)}</p>
      </div>
      <p>{formatDate(booking.tour_date)}</p>
      <p>{formatBookingTime(booking.preferred_time || 'Por confirmar')}</p>
      <div>
        <StatusPill value={booking.payment_status || 'pending'} />
        <p className="mt-1 text-xs text-gray-500">{booking.status || 'pending'}</p>
      </div>
      <div>
        <a className="font-bold text-green-800" href={`mailto:${booking.email}`}>{booking.email}</a>
        <p className="mt-1 text-gray-600">{booking.phone || 'Sin teléfono'}</p>
        {booking.special_requests && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-500">{booking.special_requests}</p>
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

function formatDate(value) {
  if (!value) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-CR', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(new Date(`${value}T12:00:00-06:00`))
}
