'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { buildWhatsAppUrl } from '@/lib/siteConfig'

export default function ToursSection({ tours, onSelectTour, filters, onFilterChange }) {
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const levelMatches = !filters.level || tour.level === filters.level
      const priceMatches = getTourPrice(tour) <= Number(filters.maxPrice || 200)
      return levelMatches && priceMatches
    })
  }, [tours, filters])

  const handleSelect = (tour) => {
    track('tour_select', { tour: tour.name, price: getTourPrice(tour) })
    onSelectTour(tour)
  }

  const handleWhatsApp = (tour) => {
    track('whatsapp_tour_click', { tour: tour.name })
    const message = [
      `Hola, quiero reservar o consultar el tour ${tour.name}.`,
      `Precio base: ${getTourPriceLabel(tour)}`,
      `Duración: ${tour.duration || 'Consultar'}`,
      'No necesito transporte incluido.'
    ].join('\n')
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Tours en Guanacaste
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Experiencias locales en el Volcán Miravalles
          </h2>
          <p className="mt-3 text-gray-600">
            Precios claros, grupos pequeños y rutas guiadas por gente local. Las tarifas no incluyen transporte.
          </p>
        </div>

        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-4 font-bold text-gray-950">Filtrar tours</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-semibold text-gray-800">Nivel de dificultad</label>
              <select
                value={filters.level || ''}
                onChange={(event) => onFilterChange('level', event.target.value)}
                className="w-full rounded border border-gray-300 bg-white p-2"
              >
                <option value="">Todos</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Moderado">Moderado</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">Precio máximo</label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.maxPrice || 200}
                onChange={(event) => onFilterChange('maxPrice', event.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-600">Hasta ${filters.maxPrice || 200}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTours.map((tour) => (
            <article key={tour.id || tour.name} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
              <div className="relative h-56">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-3 top-3 rounded bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900">
                  {tour.level || 'Consultar'}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-gray-950">{tour.name}</h3>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Desde</p>
                    <p className="text-2xl font-bold text-green-700">{getTourPriceLabel(tour)}</p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-6 text-gray-600">{tour.description}</p>

                <div className="mb-4 grid gap-2 text-sm text-gray-700">
                  {tour.duration && <InfoRow label="Duración" value={tour.duration} />}
                  {tour.distance && <InfoRow label="Distancia" value={tour.distance} />}
                  {tour.pricing?.nationalAdult && <InfoRow label="Nacional" value={tour.pricing.nationalAdult} />}
                  {tour.pricing?.group && <InfoRow label="Grupo" value={tour.pricing.group} />}
                  {tour.pricing?.private && <InfoRow label="Privado" value={tour.pricing.private} />}
                </div>

                {Array.isArray(tour.highlights) && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {tour.highlights.slice(0, 4).map((highlight) => (
                      <span key={highlight} className="rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    onClick={() => handleSelect(tour)}
                    className="rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
                  >
                    Elegir fecha
                  </button>
                  <button
                    onClick={() => handleWhatsApp(tour)}
                    className="rounded border border-green-700 px-4 py-2 font-semibold text-green-800 hover:bg-green-50"
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-1">
      <span className="font-semibold">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  )
}

function getTourPrice(tour) {
  if (typeof tour.price === 'number') return tour.price
  return Number(String(tour.price).replace('$', ''))
}

function getTourPriceLabel(tour) {
  return tour.priceLabel || `$${getTourPrice(tour)}`
}
