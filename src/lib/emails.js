import { Resend } from 'resend'

const isResendConfigured = Boolean(process.env.RESEND_API_KEY)
const resend = isResendConfigured ? new Resend(process.env.RESEND_API_KEY) : null

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

export const emailService = {
  // Email de confirmación
  async sendConfirmationEmail(email, booking, confirmationUrl) {
    try {
      const result = await sendEmail({
        from: `noreply@miravallles.cr`,
        to: email,
        subject: `Confirma tu reserva - Miravalles Expedition`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Hola ${booking.first_name}!</h1>
            
            <p>Gracias por reservar con Miravalles Expedition.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Resumen de tu reserva:</h2>
              <p><strong>Tour:</strong> ${booking.tour_name}</p>
              <p><strong>Fecha:</strong> ${booking.tour_date}</p>
              <p><strong>Participantes:</strong> ${booking.participants_count}</p>
              <p><strong>Precio Total:</strong> $${booking.total_price}</p>
            </div>
            
            <p style="color: #ef4444;">⚠️ <strong>Importante:</strong> Confirma tu reserva dentro de 24 horas haciendo clic en el botón abajo:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" style="background: #16a34a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Confirmar Reserva
              </a>
            </div>
            
            <p style="color: #666;">Si el botón no funciona, copia y pega este link en tu navegador:</p>
            <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 5px;">
              ${confirmationUrl}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px;">
              Si tienes preguntas, contáctanos: <strong>info@miravallles.cr</strong>
            </p>
            
            <p style="color: #16a34a;">¡Esperamos tu confirmación!</p>
            <p style="color: #666; font-size: 12px;">Miravalles Expedition Team</p>
          </div>
        `
      })
      
      return result
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      throw error
    }
  },

  // Email de confirmación completada
  async sendBookingConfirmedEmail(email, booking, paymentUrl) {
    try {
      const result = await sendEmail({
        from: `noreply@miravallles.cr`,
        to: email,
        subject: `Tu reserva está confirmada - Miravalles Expedition`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Tu reserva está confirmada!</h1>
            
            <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <p style="color: #15803d; margin: 0;">✅ Tu reserva ha sido confirmada exitosamente.</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles de tu reserva:</h2>
              <p><strong>ID de Reserva:</strong> ${booking.id}</p>
              <p><strong>Tour:</strong> ${booking.tour_name}</p>
              <p><strong>Fecha:</strong> ${booking.tour_date}</p>
              <p><strong>Hora de salida:</strong> 8:00 AM</p>
              <p><strong>Participantes:</strong> ${booking.participants_count}</p>
              <p><strong>Precio Total:</strong> $${booking.total_price}</p>
            </div>
            
            <p style="color: #ef4444;">⚠️ <strong>Próximo paso:</strong> Completa el pago para finalizar tu reserva.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${paymentUrl}" style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Proceder al Pago
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0;">📋 Qué llevar:</h3>
              <ul style="color: #92400e; margin-bottom: 0;">
                <li>Ropa cómoda y tenis</li>
                <li>Protector solar</li>
                <li>Repelente de insectos</li>
                <li>Cámara (opcional)</li>
              </ul>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px;">
              Si tienes preguntas: <strong>info@miravallles.cr</strong> o <strong>WhatsApp: +506 XXXX XXXX</strong>
            </p>
            
            <p style="color: #666; font-size: 12px;">Miravalles Expedition Team</p>
          </div>
        `
      })
      
      return result
    } catch (error) {
      console.error('Error sending confirmation email:', error)
      throw error
    }
  },

  // Email de recordatorio 24 horas antes
  async sendReminderEmail(email, booking) {
    try {
      const result = await sendEmail({
        from: `noreply@miravallles.cr`,
        to: email,
        subject: `Recordatorio: Tu tour es mañana - Miravalles Expedition`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">¡Tu tour es mañana!</h1>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #1f2937; margin-top: 0;">Detalles:</h2>
              <p><strong>Tour:</strong> ${booking.tour_name}</p>
              <p><strong>Fecha:</strong> Mañana</p>
              <p><strong>Hora de salida:</strong> 8:00 AM</p>
              <p><strong>Lugar de encuentro:</strong> Fortuna, Bagaces</p>
              <p><strong>Duración:</strong> Aproximadamente 4-6 horas</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0;">📝 Recordatorios importantes:</h3>
              <ul style="color: #92400e;">
                <li>Llega 15 minutos antes</li>
                <li>Lleva ropa cómoda y tenis</li>
                <li>Protector solar obligatorio</li>
                <li>Traer suficiente agua</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              ¿Preguntas de último minuto? Contáctanos:<br>
              📧 <strong>info@miravallles.cr</strong><br>
              📱 <strong>WhatsApp: +506 XXXX XXXX</strong>
            </p>
            
            <p style="color: #16a34a; font-weight: bold;">¡Nos vemos mañana!</p>
            <p style="color: #666; font-size: 12px;">Miravalles Expedition Team</p>
          </div>
        `
      })
      
      return result
    } catch (error) {
      console.error('Error sending reminder email:', error)
      throw error
    }
  }
}
