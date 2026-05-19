'use client'

import { useMemo, useState } from 'react'
import { track } from '@vercel/analytics'
import { business, contact } from '@/lib/siteConfig'

export default function PaymentSection({ cart, total, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participantsCount: 1,
    specialRequests: ''
  })
  const [status, setStatus] = useState({ type: 'idle', message: '', links: null })

  const estimatedTotal = useMemo(() => {
    return Number(total) * Number(formData.participantsCount || 1)
  }, [total, formData.participantsCount])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Creando solicitud de reserva...', links: null })
    track('booking_submit_attempt', { tours: cart.length, total: estimatedTotal })

    try {
      const responses = await Promise.all(cart.map(async (item) => {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tourId: item.id,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            participantsCount: formData.participantsCount,
            tourDate: formatDate(item.selectedDate),
            specialRequests: formData.specialRequests
          })
        })

        const payload = await response.json()
        if (!response.ok) {
          throw new Error(payload.error || 'Error al crear la reserva')
        }
        return payload
      }))

      const firstResponse = responses[0]
      track('booking_submit_success', {
        tours: cart.length,
        persisted: Boolean(firstResponse.persisted),
        total: estimatedTotal
      })
      setStatus({
        type: 'success',
        message: firstResponse.message || `Solicitud creada. Te contactaremos al ${contact.phoneDisplay}.`,
        links: {
          whatsappUrl: firstResponse.whatsappUrl,
          mailtoUrl: firstResponse.mailtoUrl
        }
      })
    } catch (error) {
      track('booking_submit_error', { message: error.message })
      setStatus({ type: 'error', message: error.message, links: null })
    }
  }

  const handleWhatsAppClick = () => {
    track('booking_whatsapp_click', { total: estimatedTotal })
  }

  const handleEmailClick = () => {
    track('booking_email_click', { total: estimatedTotal })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-950">Completar solicitud</h3>
            <p className="text-sm text-gray-600">Confirmamos disponibilidad por WhatsApp o correo.</p>
          </div>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700" aria-label="Cerrar">
            ×
          </button>
        </div>

        <div className="mb-6 space-y-3 border-b pb-4">
          {cart.map((item, i) => (
            <div key={`${item.id || item.name}-${i}`} className="flex justify-between gap-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{formatDate(item.selectedDate)}</p>
              </div>
              <p className="font-semibold">{item.priceLabel || `$${item.price}`} p.p.</p>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded bg-gray-100 p-4">
          <p className="text-gray-600">Total estimado</p>
          <p className="text-3xl font-bold text-green-700">${estimatedTotal}</p>
          <p className="mt-1 text-xs text-gray-500">
            Calculado con tarifa base por persona. {business.noTransportNotice}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold">Nombre</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full rounded border p-2" />
            </div>
            <div>
              <label className="mb-1 block font-semibold">Apellido</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full rounded border p-2" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded border p-2" />
            </div>
            <div>
              <label className="mb-1 block font-semibold">Teléfono</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={contact.phoneDisplay} className="w-full rounded border p-2" />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold">Participantes</label>
            <input
              type="number"
              name="participantsCount"
              min="1"
              max="20"
              value={formData.participantsCount}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Solicitudes especiales</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="3"
              className="w-full rounded border p-2"
              placeholder="Edad de niños, condición física, horario preferido o dudas."
            />
          </div>

          {status.message && (
            <div className={`rounded p-3 text-sm ${
              status.type === 'error' ? 'bg-red-50 text-red-700' :
                status.type === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
            }`}>
              <p>{status.message}</p>
              {status.links && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={status.links.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleWhatsAppClick}
                    className="rounded bg-green-700 px-3 py-2 text-white"
                  >
                    Enviar por WhatsApp
                  </a>
                  <a
                    href={status.links.mailtoUrl}
                    onClick={handleEmailClick}
                    className="rounded bg-gray-950 px-3 py-2 text-white"
                  >
                    Enviar por correo
                  </a>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full rounded bg-green-700 py-2 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {status.type === 'loading' ? 'Creando...' : 'Crear solicitud'}
          </button>
        </form>
      </div>
    </div>
  )
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}
