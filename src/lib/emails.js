import { Resend } from 'resend'

const isResendConfigured = Boolean(process.env.RESEND_API_KEY)
const resend = isResendConfigured ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@miravallesexpedition.com'
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'reserva.miravallesexpedition@gmail.com'

function emailNotConfigured() {
  console.warn('Resend no está configurado. No se enviará el email.')
}

async function sendEmail(payload) {
  if (!resend) {
    emailNotConfigured()
    return null
  }

  return resend.emails.send(payload)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function bookingRows(booking) {
  return `
    <p><strong>Tour:</strong> ${escapeHtml(booking.tour_name)}</p>
    <p><strong>Fecha:</strong> ${escapeHtml(booking.tour_date)}</p>
    <p><strong>Participantes:</strong> ${escapeHtml(booking.participants_count)}</p>
    <p><strong>Precio Total:</strong> $${escapeHtml(booking.total_price)}</p>
  `
}

export const emailService = {
  async sendConfirmationEmail(email, booking, confirmationUrl) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Confirma tu reserva - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Hola ${escapeHtml(booking.first_name)}!</h1>
            <p>Gracias por reservar con Miravalles Expedition.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Resumen de tu reserva:</h2>
              ${bookingRows(booking)}
            </div>
            <p style="color: #ef4444;"><strong>Importante:</strong> Confirma tu reserva dentro de 24 horas desde este enlace:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${escapeHtml(confirmationUrl)}" style="background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Confirmar Reserva
              </a>
            </div>
            <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 5px;">${escapeHtml(confirmationUrl)}</p>
            <p style="color: #666; font-size: 12px;">Si tienes preguntas, contáctanos: <strong>${escapeHtml(contactEmail)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      throw error
    }
  },

  async sendBookingConfirmedEmail(email, booking, paymentUrl) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Tu reserva está confirmada - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Tu reserva está confirmada!</h1>
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <p style="color: #15803d; margin: 0;">Tu reserva ha sido confirmada exitosamente.</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles de tu reserva:</h2>
              <p><strong>ID de Reserva:</strong> ${escapeHtml(booking.id)}</p>
              ${bookingRows(booking)}
            </div>
            <p style="color: #ef4444;"><strong>Próximo paso:</strong> Completa el pago para finalizar tu reserva.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${escapeHtml(paymentUrl)}" style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Proceder al Pago
              </a>
            </div>
            <p style="color: #666; font-size: 12px;">Si tienes preguntas: <strong>${escapeHtml(contactEmail)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending confirmed booking email:', error)
      throw error
    }
  },

  async sendReminderEmail(email, booking) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Recordatorio: Tu tour es mañana - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Tu tour es mañana!</h1>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles:</h2>
              <p><strong>Tour:</strong> ${escapeHtml(booking.tour_name)}</p>
              <p><strong>Fecha:</strong> ${escapeHtml(booking.tour_date)}</p>
              <p><strong>Hora de salida:</strong> 8:00 AM</p>
              <p><strong>Lugar de encuentro:</strong> Fortuna, Bagaces</p>
            </div>
            <p style="color: #666; font-size: 14px;">¿Preguntas de último minuto? Contáctanos: <strong>${escapeHtml(contactEmail)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending reminder email:', error)
      throw error
    }
  }
}
