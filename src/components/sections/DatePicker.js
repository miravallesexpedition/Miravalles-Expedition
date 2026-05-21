'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function DatePicker({ selectedTour, onDateSelect, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null)

  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date
  })

  const handleSelect = (date) => {
    setSelectedDate(date)
    onDateSelect(date)
  }

  if (!selectedTour) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[1.75rem] bg-[#f8f4ea] shadow-2xl">
        <div className="bg-[#071d14] p-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Reservar aventura</p>
              <h3 className="mt-2 text-2xl font-black">Elegí la fecha</h3>
              <p className="mt-2 text-sm text-white/70">{selectedTour.name}</p>
            </div>
            <button onClick={onClose} className="rounded-full bg-white/10 px-4 py-2 font-black hover:bg-white/20" aria-label="Cerrar">
              Cerrar
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="max-h-[55vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleSelect(date)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'border-[#071d14] bg-[#071d14] text-white'
                      : 'border-black/10 bg-white hover:border-green-800'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
                    {format(date, 'EEE', { locale: es })}
                  </div>
                  <div className="mt-1 text-3xl font-black">{format(date, 'd', { locale: es })}</div>
                  <div className="text-sm font-bold">{format(date, 'MMMM', { locale: es })}</div>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-gray-700">
            Esta es una solicitud, no una confirmación automática. Confirmamos clima, punto de encuentro y disponibilidad por WhatsApp.
          </p>
        </div>
      </div>
    </div>
  )
}
