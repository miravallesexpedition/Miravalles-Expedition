import { bookingService, tourService } from '@/lib/services'
import { emailService } from '@/lib/emails'
import crypto from 'crypto'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tourId, email, firstName, lastName, phone, participantsCount, tourDate, specialRequests } = body

    // Validaciones
    if (!tourId || !email || !firstName || !lastName || !participantsCount || !tourDate) {
      return Response.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Obtener información del tour
    const tour = await tourService.getTourById(tourId)
    if (!tour) {
      return Response.json(
        { error: 'Tour no encontrado' },
        { status: 404 }
      )
    }

    // Generar token de confirmación
    const confirmationToken = crypto.randomBytes(32).toString('hex')
    
    // Calcular precio total
    const totalPrice = tour.price * participantsCount

    // Crear reserva en la base de datos
    const booking = await bookingService.createBooking({
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
    })

    // URL de confirmación
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const confirmationUrl = `${appUrl}/confirmar-reserva/${confirmationToken}`

    // Enviar email de confirmación
    try {
      await emailService.sendConfirmationEmail(email, {
        first_name: firstName,
        tour_name: tour.name,
        tour_date: tourDate,
        participants_count: participantsCount,
        total_price: totalPrice
      }, confirmationUrl)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // No fallar la reserva si el email falla
    }

    return Response.json({
      success: true,
      bookingId: booking.id,
      message: 'Reserva creada. Por favor, verifica tu email para confirmar.',
      confirmationUrl: confirmationUrl
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return Response.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}
