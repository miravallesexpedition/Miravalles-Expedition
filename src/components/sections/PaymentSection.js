'use client'

import { useState } from 'react'

export default function PaymentSection({ cart, total, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participantsCount: 1,
    specialRequests: ''
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: 'loading', message: 'Creando reserva...' })

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

      setStatus({
        type: 'success',
        message: `Reserva creada. Revisa tu correo para confirmar y continuar al pago. (${responses.length})`
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Completar Reserva</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-3 mb-6 pb-4 border-b">
          {cart.map((item, i) => (
            <div key={`${item.id || item.name}-${i}`} className="flex justify-between gap-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{formatDate(item.selectedDate)}</p>
              </div>
              <p className="font-semibold">{item.priceLabel || `$${item.price}`}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 p-4 bg-gray-100 rounded">
          <p className="text-gray-600">Total estimado</p>
          <p className="text-3xl font-bold text-green-600">${total}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Nombre</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Apellido</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Teléfono</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Participantes por tour</label>
            <input
              type="number"
              name="participantsCount"
              min="1"
              max="20"
              value={formData.participantsCount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Solicitudes especiales</label>
            <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className="w-full p-2 border rounded" />
          </div>

          {status.message && (
            <p className={`rounded p-3 text-sm ${
              status.type === 'error' ? 'bg-red-50 text-red-700' :
                status.type === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
            }`}>
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {status.type === 'loading' ? 'Creando...' : 'Crear reserva'}
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
