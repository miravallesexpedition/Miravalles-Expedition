import crypto from 'crypto'
import { bookingService, tourService } from '@/lib/services'
import { buildMailtoUrl, buildWhatsAppUrl, contact } from '@/lib/siteConfig'
import { emailService } from '@/lib/emails'
import { formatMoney, getTourQuote, normalizeCustomerType } from '@/lib/pricing'
import { formatBookingTime, isValidBookingTime } from '@/lib/timeSlots'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, email, firstName, lastName, phone, tourDate, preferredTime, specialRequests } = body
    const participantsCount = Number(body.participantsCount)
    const customerType = normalizeCustomerType(body.customerType)
    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanFirstName = String(firstName || '').trim()
    const cleanLastName = String(lastName || '').trim()
    const cleanPhone = String(phone || '').trim()
    const cleanTourDate = String(tourDate || '').trim()
    const cleanPreferredTime = String(preferredTime || '07:00').trim()
    const cleanSpecialRequests = String(specialRequests || '').trim()

    if (!tourId || !cleanEmail || !cleanFirstName || !cleanLastName || !cleanTourDate) {
      return Response.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    if (!Number.isInteger(participantsCount) || participantsCount < 1 || participantsCount > 20) {
      return Response.json(
        { error: 'La cantidad de participantes debe estar entre 1 y 20' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      return Response.json(
        { error: 'Correo inválido' },
        { status: 400 }
      )
    }

    const todayCostaRica = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Costa_Rica',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date())

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanTourDate) || cleanTourDate < todayCostaRica) {
      return Response.json(
        { error: 'La fecha del tour debe ser válida y futura' },
        { status: 400 }
      )
    }

    if (!isValidBookingTime(cleanPreferredTime)) {
      return Response.json(
        { error: 'La hora preferida debe ser válida' },
        { status: 400 }
      )
    }

    const tour = await tourService.getTourById(tourId)
    if (!tour) {
      return Response.json(
        { error: 'Tour no encontrado' },
        { status: 404 }
      )
    }

    const confirmationToken = crypto.randomBytes(32).toString('hex')
    const quote = getTourQuote(tour, customerType)

    if (!Number.isFinite(quote.unitPrice)) {
      return Response.json(
        { error: 'La tarifa de este tour requiere confirmación manual' },
        { status: 400 }
      )
    }

    const totalPrice = quote.unitPrice * participantsCount
    const totalLabel = formatMoney(totalPrice, quote.currency)
    const customerTypeLabel = customerType === 'national' ? 'Nacional o residente' : 'Extranjero'

    const bookingPayload = {
      tour_id: tourId,
      email: cleanEmail,
      first_name: cleanFirstName,
      last_name: cleanLastName,
      phone: cleanPhone,
      participants_count: participantsCount,
      tour_date: cleanTourDate,
      status: 'pending',
      confirmation_token: confirmationToken,
      customer_type: customerType,
      currency: quote.currency,
      unit_price: quote.unitPrice,
      price_label: quote.priceLabel,
      total_price: totalPrice,
      preferred_time: cleanPreferredTime,
      special_requests: cleanSpecialRequests
    }

    const booking = await bookingService.createBooking(bookingPayload)

    const summary = [
      'Nueva solicitud de reserva',
      `Tour: ${tour.name}`,
      `Fecha: ${cleanTourDate}`,
      `Hora preferida: ${formatBookingTime(cleanPreferredTime)}`,
      `Participantes: ${participantsCount}`,
      `Tipo de cliente: ${customerTypeLabel}`,
      `Precio por persona: ${quote.priceLabel}`,
      `Total estimado: ${totalLabel}`,
      `Nombre: ${cleanFirstName} ${cleanLastName}`,
      `Correo: ${cleanEmail}`,
      `Teléfono: ${cleanPhone || 'No indicado'}`,
      `Notas: ${cleanSpecialRequests || 'Ninguna'}`,
      'Transporte: no incluido'
    ].join('\n')

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const confirmationUrl = `${appUrl}/confirmar-reserva/${confirmationToken}`
    const whatsappUrl = buildWhatsAppUrl(summary)
    const mailtoUrl = buildMailtoUrl('Nueva solicitud de reserva', summary)

    const emailBooking = {
      ...bookingPayload,
      id: booking.id,
      tour_name: tour.name
    }

    let customerConfirmationEmailSent = false

    try {
      await emailService.sendBookingRequestEmail({
        ...emailBooking,
        first_name: cleanFirstName,
        last_name: cleanLastName,
        tour_name: tour.name,
        tour_date: cleanTourDate,
        preferred_time: cleanPreferredTime,
        participants_count: participantsCount,
        total_price: totalPrice,
        currency: quote.currency,
        customer_type: customerType
      }, whatsappUrl)
    } catch (emailError) {
      console.error('Error sending admin booking email:', emailError)
    }

    if (booking.persisted) {
      try {
        await emailService.sendConfirmationEmail(cleanEmail, {
          ...emailBooking,
          first_name: cleanFirstName,
          tour_name: tour.name,
          tour_date: cleanTourDate,
          preferred_time: cleanPreferredTime,
          participants_count: participantsCount,
          total_price: totalPrice,
          currency: quote.currency,
          customer_type: customerType
        }, confirmationUrl)
        customerConfirmationEmailSent = true
      } catch (emailError) {
        console.error('Error sending customer confirmation email:', emailError)
      }
    }

    return Response.json({
      success: true,
      bookingId: booking.id,
      persisted: Boolean(booking.persisted),
      customerType,
      currency: quote.currency,
      total: totalPrice,
      totalLabel,
      emailSent: customerConfirmationEmailSent,
      message: booking.persisted
        ? (customerConfirmationEmailSent
          ? 'Reserva creada. Por favor, revisá tu correo para confirmar.'
          : `Reserva registrada. Usa el botón de confirmación o contáctanos por WhatsApp para terminar el proceso con ${contact.phoneDisplay}.`)
        : `Solicitud preparada. Envíala por WhatsApp o correo para confirmar con ${contact.phoneDisplay}.`,
      confirmationUrl: booking.persisted ? confirmationUrl : null,
      whatsappUrl,
      mailtoUrl
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return Response.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}
