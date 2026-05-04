'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function DatePicker({ selectedTour, onDateSelect, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null)
  
  // Generar próximos 30 días disponibles
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Selecciona una Fecha</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        
        <p className="mb-4 text-gray-600"><span className="font-semibold">Tour:</span> {selectedTour.name}</p>
        
        <div className="max-h-64 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {availableDates.map((date, i) => (
              <button
                key={i}
                onClick={() => handleSelect(date)}
                className={`p-2 rounded border transition ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'bg-green-600 text-white border-green-600'
                    : 'border-gray-300 hover:border-green-600'
                }`}
              >
                <div className="font-semibold text-sm">{format(date, 'MMM', { locale: es })}</div>
                <div className="text-lg">{format(date, 'd', { locale: es })}</div>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">
              Fecha seleccionada: {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
