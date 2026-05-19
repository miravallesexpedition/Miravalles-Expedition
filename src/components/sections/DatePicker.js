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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-950">Seleccioná una fecha</h3>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-700" aria-label="Cerrar">
            ×
          </button>
        </div>

        <p className="mb-4 text-gray-600">
          <span className="font-semibold">Tour:</span> {selectedTour.name}
        </p>

        <div className="max-h-64 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {availableDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => handleSelect(date)}
                className={`rounded border p-2 transition ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'border-green-700 bg-green-700 text-white'
                    : 'border-gray-300 hover:border-green-700'
                }`}
              >
                <div className="text-sm font-semibold">{format(date, 'MMM', { locale: es })}</div>
                <div className="text-lg">{format(date, 'd', { locale: es })}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4 text-center">
            <p className="font-semibold text-green-700">
              Fecha seleccionada: {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
