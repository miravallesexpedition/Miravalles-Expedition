'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ToursSection({ tours, onSelectTour, filters, onFilterChange }) {
  const [filteredTours, setFilteredTours] = useState(tours)

  const handleFilter = (type, value) => {
    onFilterChange(type, value)
    
    let filtered = tours
    
    if (filters.level && filters.level !== 'Todos') {
      filtered = filtered.filter(t => t.level === filters.level)
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(t => {
        const price = parseInt(t.price.replace('$', ''))
        return price <= filters.maxPrice
      })
    }
    
    setFilteredTours(filtered)
  }

  return (
    <section className="p-10 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Tours</h2>
      
      {/* FILTROS */}
      <div className="max-w-6xl mx-auto mb-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-4">Filtros</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Nivel de Dificultad</label>
            <select 
              value={filters.level || ''}
              onChange={(e) => handleFilter('level', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="Relajado">Relajado</option>
              <option value="Fácil">Fácil</option>
              <option value="Moderado">Moderado</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-semibold">Precio Máximo</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={filters.maxPrice || 100}
              onChange={(e) => handleFilter('maxPrice', e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-600">${filters.maxPrice || 100}</p>
          </div>
        </div>
      </div>

      {/* TOURS GRID */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredTours.map((tour, i) => (
          <div key={i} className="border p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Image 
              src={tour.image} 
              alt={tour.name}
              width={400}
              height={192}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
            <p className="text-gray-600 mb-2">{tour.description}</p>
            <p className="mb-1"><span className="font-semibold">Nivel:</span> {tour.level}</p>
            <p className="mb-4"><span className="font-semibold">Desde:</span> {tour.price}</p>
            <button
              onClick={() => onSelectTour(tour)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
