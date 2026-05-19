'use client'

import { useState } from 'react'
import { contact } from '@/lib/siteConfig'

export default function ContactForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-950">Consulta rápida</h3>
            <p className="text-sm text-gray-600">Respondemos por WhatsApp o correo.</p>
          </div>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700" aria-label="Cerrar">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-semibold">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded border p-2"
              placeholder={contact.phoneDisplay}
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full rounded border p-2"
              placeholder="Tour, fecha, cantidad de personas o dudas..."
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-green-700 py-2 font-semibold text-white hover:bg-green-800"
          >
            Enviar consulta
          </button>
        </form>
      </div>
    </div>
  )
}
