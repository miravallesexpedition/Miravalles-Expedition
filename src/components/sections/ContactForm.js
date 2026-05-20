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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-[1.75rem] bg-[#f8f4ea] shadow-2xl">
        <div className="bg-[#071d14] p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Quick request</p>
              <h3 className="mt-2 text-2xl font-black">Plan your Miravalles adventure</h3>
              <p className="mt-2 text-sm text-white/70">We answer by WhatsApp or email.</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 px-4 py-2 font-black hover:bg-white/20" aria-label="Cerrar">
              Close
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <Field label="Name">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              placeholder="Your name"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              placeholder="you@email.com"
            />
          </Field>

          <Field label="Phone / WhatsApp">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              placeholder={contact.phoneDisplay}
            />
          </Field>

          <Field label="Message">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
              placeholder="Tour, date, number of people or questions..."
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-full bg-[#071d14] py-4 font-black text-white transition hover:bg-green-900"
          >
            Send Request
          </button>
        </form>
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
