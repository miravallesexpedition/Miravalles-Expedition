import { bookingService, tourService } from '@/lib/services'
import { emailService } from '@/lib/emails'
import crypto from 'crypto'

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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const confirmationUrl = `${appUrl}/confirmar-reserva/${confirmationToken}`

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
    }

    return Response.json({
      success: true,
      bookingId: booking.id,
      message: 'Reserva creada. Por favor, verifica tu email para confirmar.',
      confirmationUrl
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return Response.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}
