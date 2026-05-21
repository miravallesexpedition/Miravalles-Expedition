'use client'

import { useEffect, useMemo, useState } from 'react'
import { track } from '@vercel/analytics'
import { business, contact } from '@/lib/siteConfig'
import { calculateBookingTotal, getTourChildQuote, getTourQuote } from '@/lib/pricing'
import { bookingTimeSlots, formatBookingTime } from '@/lib/timeSlots'

export default function PaymentSection({ cart, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participantsCount: 1,
    childrenCount: 0,
    customerType: 'foreign',
    preferredTime: '07:00',
    paymentPreference: 'Coordinar por WhatsApp',
    specialRequests: ''
  })
  const [status, setStatus] = useState({ type: 'idle', message: '', links: null })
  const [availability, setAvailability] = useState({ type: 'idle', slots: [], capacityPerSlot: 10, largeGroupsMessage: '' })

  const primaryCartItem = cart[0] || null
  const selectedDate = primaryCartItem?.selectedDate ? formatDate(primaryCartItem.selectedDate) : ''

  const quoteSummary = useMemo(() => (
    calculateBookingTotal(cart, formData.participantsCount, formData.customerType, formData.childrenCount)
  ), [cart, formData.participantsCount, formData.customerType, formData.childrenCount])

  useEffect(() => {
    if (!primaryCartItem?.id || !selectedDate) return

    let ignore = false
    async function loadAvailability() {
      setAvailability({ type: 'loading', slots: [], capacityPerSlot: 10, largeGroupsMessage: '' })
      try {
        const params = new URLSearchParams({
          tourId: primaryCartItem.id,
          date: selectedDate
        })
        const response = await fetch(`/api/availability?${params.toString()}`)
        const payload = await response.json()

        if (!ignore && response.ok) {
          setAvailability({
            type: 'ready',
            slots: payload.slots || [],
            capacityPerSlot: payload.capacityPerSlot || 10,
            largeGroupsMessage: payload.largeGroupsMessage || ''
          })
        }
      } catch (error) {
        if (!ignore) {
          setAvailability({ type: 'error', slots: [], capacityPerSlot: 10, largeGroupsMessage: '' })
        }
      }
    }

    loadAvailability()
    return () => {
      ignore = true
    }
  }, [primaryCartItem?.id, selectedDate])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => {
      if (name === 'participantsCount') {
        const participantsCount = Math.max(1, Number(value || 1))
        return {
          ...prev,
          participantsCount,
          childrenCount: Math.min(Number(prev.childrenCount || 0), participantsCount)
        }
      }

      if (name === 'childrenCount') {
        return {
          ...prev,
          childrenCount: Math.min(Number(value || 0), Number(prev.participantsCount || 1))
        }
      }

      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Creando tu solicitud de reserva...', links: null })
    track('booking_submit_attempt', {
      tours: cart.length,
      total: quoteSummary.total || 0,
      currency: quoteSummary.currency,
      customerType: formData.customerType
    })

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
            childrenCount: formData.childrenCount,
            customerType: formData.customerType,
            tourDate: formatDate(item.selectedDate),
            preferredTime: formData.preferredTime,
            specialRequests: formData.specialRequests
              ? `${formData.specialRequests}\nPago preferido: ${formData.paymentPreference}`
              : `Pago preferido: ${formData.paymentPreference}`
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
        total: quoteSummary.total || 0,
        currency: quoteSummary.currency,
        customerType: formData.customerType
      })
      setStatus({
        type: 'success',
        message: firstResponse.message || `Solicitud creada. Te contactaremos al ${contact.phoneDisplay}.`,
        links: {
          whatsappUrl: firstResponse.whatsappUrl,
          mailtoUrl: firstResponse.mailtoUrl,
          confirmationUrl: firstResponse.confirmationUrl
        }
      })
    } catch (error) {
      track('booking_submit_error', { message: error.message })
      setStatus({ type: 'error', message: error.message, links: null })
    }
  }

  const handleWhatsAppClick = () => {
    track('booking_whatsapp_click', { total: quoteSummary.total || 0, currency: quoteSummary.currency })
  }

  const handleEmailClick = () => {
    track('booking_email_click', { total: quoteSummary.total || 0, currency: quoteSummary.currency })
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-dialog-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-[#f8f4ea] shadow-2xl">
        <div className="bg-[#071d14] p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Solicitud segura</p>
              <h3 id="booking-dialog-title" className="mt-2 text-2xl font-black">Completá tu solicitud de reserva</h3>
              <p className="mt-2 text-sm text-white/70">La disponibilidad se confirma personalmente por WhatsApp o correo.</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 px-4 py-2 font-black hover:bg-white/20" aria-label="Cerrar">
              Cerrar
            </button>
          </div>
        </div>

        <div className="grid gap-5 p-5 lg:grid-cols-[1fr_240px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nombre">
                <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3" />
              </Field>
              <Field label="Apellido">
                <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3" />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Correo">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3" />
              </Field>
              <Field label="Teléfono">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={contact.phoneDisplay} className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3" />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Visitante">
                <select
                  name="customerType"
                  value={formData.customerType}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                >
                  <option value="foreign">Extranjero / USD</option>
                  <option value="national">Nacional o residente</option>
                </select>
              </Field>
              <Field label="Personas total">
                <input
                  type="number"
                  name="participantsCount"
                  min="1"
                  max="60"
                  value={formData.participantsCount}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                />
              </Field>
              <Field label="Niños">
                <input
                  type="number"
                  name="childrenCount"
                  min="0"
                  max={formData.participantsCount}
                  value={formData.childrenCount}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Horario">
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                >
                  {bookingTimeSlots.map((slot) => {
                    const slotAvailability = availability.slots.find((item) => item.value === slot.value)
                    const people = Math.max(1, Number(formData.participantsCount || 1))
                    const isFull = Boolean(slotAvailability && slotAvailability.remaining <= 0)
                    const needsConfirmation = Boolean(slotAvailability && slotAvailability.remaining > 0 && slotAvailability.remaining < people)
                    const note = isFull ? ' - cupo estándar lleno' : needsConfirmation ? ' - confirmar grupo' : ''

                    return (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}{note}
                      </option>
                    )
                  })}
                </select>
                {availability.type === 'ready' && (
                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Cupo estándar: {availability.capacityPerSlot} personas por horario. Grupos grandes se revisan por WhatsApp antes del pago.
                  </p>
                )}
              </Field>
              <Field label="Pago">
                <select
                  name="paymentPreference"
                  value={formData.paymentPreference}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                >
                  <option>Coordinar por WhatsApp</option>
                  <option>Depósito</option>
                  <option>Efectivo</option>
                  <option>PayPal</option>
                </select>
              </Field>
            </div>

            <Field label="Notas especiales">
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
                placeholder="Edades de niños, condición física, horario preferido o preguntas."
              />
            </Field>

            <div className="rounded-2xl border border-green-900/10 bg-white p-4 text-sm leading-6 text-gray-700">
              <p className="font-black text-[#071d14]">Pago seguro y confirmado</p>
              <p className="mt-1">
                Primero creamos la solicitud y confirmamos disponibilidad. Para pagos en USD, el botón de confirmación te lleva a PayPal; no guardamos datos de tarjeta en este sitio.
              </p>
            </div>

            {status.message && (
              <div className={`rounded-2xl p-4 text-sm ${
                status.type === 'error' ? 'bg-red-50 text-red-700' :
                  status.type === 'success' ? 'bg-green-50 text-green-800' :
                    'bg-blue-50 text-blue-800'
              }`}>
                <p>{status.message}</p>
                {status.links && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {status.links.confirmationUrl && (
                      <a
                        href={status.links.confirmationUrl}
                        className="rounded-full bg-amber-300 px-4 py-2 font-black text-[#071d14]"
                      >
                        Confirmar y continuar al pago
                      </a>
                    )}
                    <a
                      href={status.links.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleWhatsAppClick}
                      className="rounded-full bg-green-700 px-4 py-2 font-black text-white"
                    >
                      Enviar por WhatsApp
                    </a>
                    <a
                      href={status.links.mailtoUrl}
                      onClick={handleEmailClick}
                      className="rounded-full bg-gray-950 px-4 py-2 font-black text-white"
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
              className="w-full rounded-full bg-[#071d14] py-4 font-black text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {status.type === 'loading' ? 'Creando...' : 'Crear solicitud'}
            </button>
          </form>

          <aside className="rounded-[1.5rem] bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">Tu solicitud</p>
            <div className="mt-4 space-y-3">
              {cart.map((item, i) => (
                <div key={`${item.id || item.name}-${i}`} className="border-b border-gray-100 pb-3">
                  <p className="font-black text-[#11130f]">{item.name}</p>
                  <p className="text-sm text-gray-600">{formatDate(item.selectedDate)}</p>
                  <p className="text-sm text-gray-600">{formatSelectedTime(formData.preferredTime)}</p>
                  <p className="text-sm font-bold text-green-800">
                    Adulto {getTourQuote(item, formData.customerType).priceLabel}
                  </p>
                  {Number(formData.childrenCount || 0) > 0 && (
                    <p className="text-sm font-bold text-green-800">
                      Niño {getTourChildQuote(item, formData.customerType).priceLabel}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#f4efe3] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-500">Total estimado</p>
              <p className="mt-1 text-4xl font-black text-green-800">{quoteSummary.label}</p>
              <p className="mt-2 text-xs leading-5 text-gray-600">
                {formData.customerType === 'national' ? 'Tarifa nacional/residente.' : 'Tarifa base para extranjeros.'} {business.noTransportNotice}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-gray-600">{label}</span>
      {children}
    </label>
  )
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}

function formatSelectedTime(value) {
  return formatBookingTime(value)
}
