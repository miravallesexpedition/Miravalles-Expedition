import crypto from 'crypto'
import { bookingService, tourService } from '@/lib/services'
import { buildMailtoUrl, buildWhatsAppUrl, contact } from '@/lib/siteConfig'
import { emailService } from '@/lib/emails'
import { formatMoney, getTourChildQuote, getTourQuote, normalizeCustomerType } from '@/lib/pricing'
import { formatBookingTime, isValidBookingTime } from '@/lib/timeSlots'
import { createConfirmationExpiryDate, getSlotAvailability } from '@/lib/bookingRules'
import { getAppUrl } from '@/lib/appUrl'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, email, firstName, lastName, phone, tourDate, preferredTime, specialRequests } = body
    const participantsCount = Number(body.participantsCount)
    const childrenCount = Math.max(0, Number(body.childrenCount || 0))
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

    if (!Number.isInteger(participantsCount) || participantsCount < 1 || participantsCount > 60) {
      return Response.json(
        { error: 'La cantidad de participantes debe estar entre 1 y 60' },
        { status: 400 }
      )
    }

    if (!Number.isInteger(childrenCount) || childrenCount > participantsCount) {
      return Response.json(
        { error: 'La cantidad de niños debe ser válida y no mayor al total de personas' },
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

    const slotAvailability = await getSlotAvailability(bookingService, tourId, cleanTourDate, cleanPreferredTime)

    if (participantsCount > slotAvailability.remaining) {
      return Response.json(
        {
          error: slotAvailability.remaining > 0
            ? `Solo quedan ${slotAvailability.remaining} espacios disponibles para esa hora`
            : 'Ese horario ya no tiene espacios disponibles',
          remaining: slotAvailability.remaining
        },
        { status: 409 }
      )
    }

    const confirmationToken = crypto.randomBytes(32).toString('hex')
    const confirmationExpiresAt = createConfirmationExpiryDate().toISOString()
    const quote = getTourQuote(tour, customerType)
    const childQuote = getTourChildQuote(tour, customerType)
    const adultCount = Math.max(0, participantsCount - childrenCount)

    if (!Number.isFinite(quote.unitPrice) || !Number.isFinite(childQuote.unitPrice) || quote.currency !== childQuote.currency) {
      return Response.json(
        { error: 'La tarifa de este tour requiere confirmación manual' },
        { status: 400 }
      )
    }

    const totalPrice = (quote.unitPrice * adultCount) + (childQuote.unitPrice * childrenCount)
    const totalLabel = formatMoney(totalPrice, quote.currency)
    const customerTypeLabel = customerType === 'national' ? 'Nacional o residente' : 'Extranjero'
    const priceLabel = childrenCount > 0
      ? `Adulto: ${quote.priceLabel} / Niño: ${childQuote.priceLabel}`
      : quote.priceLabel
    const enrichedSpecialRequests = [
      childrenCount > 0 ? `Adultos: ${adultCount}. Niños: ${childrenCount}.` : null,
      cleanSpecialRequests
    ].filter(Boolean).join('\n')

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
      confirmation_expires_at: confirmationExpiresAt,
      customer_type: customerType,
      currency: quote.currency,
      unit_price: quote.unitPrice,
      price_label: priceLabel,
      total_price: totalPrice,
      preferred_time: cleanPreferredTime,
      special_requests: enrichedSpecialRequests
    }

    const booking = await bookingService.createBooking(bookingPayload)

    const summary = [
      'Nueva solicitud de reserva',
      `Tour: ${tour.name}`,
      `Fecha: ${cleanTourDate}`,
      `Hora preferida: ${formatBookingTime(cleanPreferredTime)}`,
      `Participantes: ${participantsCount}`,
      `Adultos: ${adultCount}`,
      `Niños: ${childrenCount}`,
      `Tipo de cliente: ${customerTypeLabel}`,
      `Precio: ${priceLabel}`,
      `Total estimado: ${totalLabel}`,
      `Nombre: ${cleanFirstName} ${cleanLastName}`,
      `Correo: ${cleanEmail}`,
      `Teléfono: ${cleanPhone || 'No indicado'}`,
      `Notas: ${enrichedSpecialRequests || 'Ninguna'}`,
      'Transporte: no incluido'
    ].join('\n')

    const appUrl = getAppUrl(request.url)
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
        customer_type: customerType,
        adult_count: adultCount,
        children_count: childrenCount
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
          customer_type: customerType,
          adult_count: adultCount,
          children_count: childrenCount
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
