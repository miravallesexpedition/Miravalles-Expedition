import crypto from 'crypto'
import { bookingService, tourService } from '@/lib/services'
import { buildMailtoUrl, buildWhatsAppUrl, contact } from '@/lib/siteConfig'
import { emailService } from '@/lib/emails'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, email, firstName, lastName, phone, tourDate, specialRequests } = body
    const participantsCount = Number(body.participantsCount)

    if (!tourId || !email || !firstName || !lastName || !tourDate) {
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
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Email inválido' },
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
    const totalPrice = Number(tour.price) * participantsCount

    const bookingPayload = {
      tour_id: tourId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone,
      participants_count: participantsCount,
      tour_date: tourDate,
      status: 'pending',
      confirmation_token: confirmationToken,
      total_price: totalPrice,
      special_requests: specialRequests
    }

    const booking = await bookingService.createBooking(bookingPayload)

    const summary = [
      'Nueva solicitud de reserva',
      `Tour: ${tour.name}`,
      `Fecha: ${tourDate}`,
      `Participantes: ${participantsCount}`,
      `Total estimado: $${totalPrice}`,
      `Nombre: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Teléfono: ${phone || 'No indicado'}`,
      `Notas: ${specialRequests || 'Ninguna'}`,
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

    try {
      await Promise.all([
        emailService.sendConfirmationEmail(email, {
          ...emailBooking,
          first_name: firstName,
          tour_name: tour.name,
          tour_date: tourDate,
          participants_count: participantsCount,
          total_price: totalPrice
        }, confirmationUrl),
        emailService.sendBookingRequestEmail({
          ...emailBooking,
          first_name: firstName,
          last_name: lastName,
          tour_name: tour.name,
          tour_date: tourDate,
          participants_count: participantsCount,
          total_price: totalPrice
        }, whatsappUrl)
      ])
    } catch (emailError) {
      console.error('Error sending email:', emailError)
    }

    return Response.json({
      success: true,
      bookingId: booking.id,
      persisted: Boolean(booking.persisted),
      message: booking.persisted
        ? 'Reserva creada. Por favor, verifica tu email para confirmar.'
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
