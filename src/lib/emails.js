import { Resend } from 'resend'
import { contact } from './siteConfig'
import { formatMoney } from './pricing'
import { formatBookingTime } from './timeSlots'

export const isResendConfigured = Boolean(process.env.RESEND_API_KEY)
const resend = isResendConfigured ? new Resend(process.env.RESEND_API_KEY) : null
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@miravallesexpedition.com'
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || contact.email

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
  const customerType = booking.customer_type === 'national' ? 'Nacional o residente' : 'Extranjero'

  return `
    <p><strong>Tour:</strong> ${escapeHtml(booking.tour_name)}</p>
    <p><strong>Fecha:</strong> ${escapeHtml(booking.tour_date)}</p>
    <p><strong>Hora preferida:</strong> ${escapeHtml(formatBookingTime(booking.preferred_time || 'Por confirmar'))}</p>
    <p><strong>Participantes:</strong> ${escapeHtml(booking.participants_count)}</p>
    <p><strong>Tipo de cliente:</strong> ${escapeHtml(customerType)}</p>
    <p><strong>Precio total estimado:</strong> ${escapeHtml(formatMoney(booking.total_price, booking.currency || 'USD'))}</p>
  `
}

function preparationBlock() {
  return `
    <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 18px; border-radius: 10px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #713f12;">Antes del tour</h3>
      <p><strong>Qué llevar:</strong> buena hidratación, zapatos cómodos para caminata, ropa fresca, bloqueador solar y repelente.</p>
      <p><strong>Incluye:</strong> guía local, snacks, agua en caso de necesitarla, acompañamiento durante el recorrido y fotografías personales opcionales.</p>
      <p><strong>No incluye:</strong> transporte. El punto de encuentro se confirma por WhatsApp.</p>
    </div>
  `
}

export const emailService = {
  async sendBookingRequestEmail(booking, whatsappUrl) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: contactEmail,
        subject: `Nueva reserva: ${booking.tour_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
            <h1 style="color: #166534;">Nueva solicitud de reserva</h1>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${bookingRows(booking)}
              <p><strong>Cliente:</strong> ${escapeHtml(booking.first_name)} ${escapeHtml(booking.last_name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
              <p><strong>Teléfono:</strong> ${escapeHtml(booking.phone || 'No indicado')}</p>
              <p><strong>Notas:</strong> ${escapeHtml(booking.special_requests || 'Ninguna')}</p>
            </div>
            <p>Recordatorio: el transporte no está incluido. Confirmar punto de encuentro y hora por WhatsApp.</p>
            <p><a href="${escapeHtml(whatsappUrl)}" style="background: #166534; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Abrir conversación</a></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending booking request email:', error)
      throw error
    }
  },

  async sendConfirmationEmail(email, booking, confirmationUrl) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Confirma tu reserva - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #166534;">Hola ${escapeHtml(booking.first_name)}</h1>
            <p>Gracias por reservar con Miravalles Expedition.</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Resumen de tu reserva</h2>
              ${bookingRows(booking)}
            </div>
            <p><strong>Importante:</strong> el transporte no está incluido. Coordinaremos el punto de encuentro por WhatsApp.</p>
            ${preparationBlock()}
            <p style="color: #ef4444;"><strong>Confirmá tu reserva dentro de 24 horas desde este enlace:</strong></p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${escapeHtml(confirmationUrl)}" style="background: #166534; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Confirmar reserva
              </a>
            </div>
            <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 5px;">${escapeHtml(confirmationUrl)}</p>
            <p style="color: #666; font-size: 12px;">Preguntas: <strong>${escapeHtml(contact.phoneDisplay)}</strong> | <strong>${escapeHtml(contactEmail)}</strong></p>
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
            <h1 style="color: #166534;">Tu reserva está confirmada</h1>
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #166534;">
              <p style="color: #15803d; margin: 0;">Tu reserva ha sido confirmada exitosamente.</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles</h2>
              <p><strong>ID de reserva:</strong> ${escapeHtml(booking.id)}</p>
              ${bookingRows(booking)}
            </div>
            <p><strong>Próximo paso:</strong> completá el pago para finalizar tu reserva.</p>
            ${preparationBlock()}
            <div style="text-align: center; margin: 30px 0;">
              <a href="${escapeHtml(paymentUrl)}" style="background: #166534; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Proceder al pago
              </a>
            </div>
            <p style="color: #666; font-size: 12px;">Preguntas: <strong>${escapeHtml(contactEmail)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending confirmed booking email:', error)
      throw error
    }
  },

  async sendPaymentReceivedEmail(email, booking) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Pago recibido - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #166534;">Pago recibido</h1>
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #166534;">
              <p style="color: #15803d; margin: 0;">Registramos correctamente el pago de tu reserva.</p>
            </div>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Resumen</h2>
              <p><strong>ID de reserva:</strong> ${escapeHtml(booking.id)}</p>
              ${bookingRows(booking)}
              <p><strong>ID de pago:</strong> ${escapeHtml(booking.paypal_capture_id || booking.payment_id || 'Registrado')}</p>
            </div>
            <p><strong>Importante:</strong> antes del tour confirmaremos punto de encuentro, clima y recomendaciones por WhatsApp.</p>
            ${preparationBlock()}
            <p style="color: #666; font-size: 12px;">Preguntas: <strong>${escapeHtml(contact.phoneDisplay)}</strong> | <strong>${escapeHtml(contactEmail)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending payment received email:', error)
      throw error
    }
  },

  async sendReminderEmail(email, booking) {
    try {
      return await sendEmail({
        from: fromEmail,
        to: email,
        subject: 'Recordatorio: tu tour es mañana - Miravalles Expedition',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #166534;">Tu tour es mañana</h1>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles</h2>
              <p><strong>Tour:</strong> ${escapeHtml(booking.tour_name)}</p>
              <p><strong>Fecha:</strong> ${escapeHtml(booking.tour_date)}</p>
              <p><strong>Lugar de encuentro:</strong> Fortuna, Guanacaste</p>
            </div>
            ${preparationBlock()}
            <p style="color: #666; font-size: 14px;">Preguntas de último minuto: <strong>${escapeHtml(contact.phoneDisplay)}</strong></p>
          </div>
        `
      })
    } catch (error) {
      console.error('Error sending reminder email:', error)
      throw error
    }
  }
}
