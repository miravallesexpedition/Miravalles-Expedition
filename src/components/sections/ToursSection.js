'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
    <section className="bg-[#f8f4ea] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Aventuras principales
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
              Tours diseñados como expediciones, no como excursiones genéricas.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            Precios claros, fotos reales, guía local y grupos compactos. Cada tour explica dificultad, duración y qué incluye antes de pedir una reserva.
          </p>
        </div>

        <div className="mb-8 rounded-[1.5rem] border border-black/5 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-gray-600">Dificultad</label>
              <select
                value={filters.level || ''}
                onChange={(event) => onFilterChange('level', event.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900"
              >
                <option value="">Todos los niveles</option>
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Moderado">Moderado</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-gray-600">Precio máximo</label>
              <input
                type="range"
                min="0"
                max="200"
                value={filters.maxPrice || 200}
                onChange={(event) => onFilterChange('maxPrice', event.target.value)}
                className="w-full accent-green-800"
              />
              <p className="mt-1 text-sm font-semibold text-gray-600">Hasta ${filters.maxPrice || 200}</p>
            </div>

            <p className="rounded-full bg-[#071d14] px-5 py-3 text-center text-sm font-black text-white">
              {filteredTours.length} tours
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <article key={tour.id || tour.name} className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#071d14]">
                  {tour.level || 'Consultar'}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{tour.location}</p>
                  <h3 className="mt-2 text-2xl font-black leading-tight">{tour.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5 grid grid-cols-3 gap-2 text-center">
                  <InfoPill label="Desde" value={getTourPriceLabel(tour)} />
                  <InfoPill label="Duración" value={tour.duration || 'Consultar'} />
                  <InfoPill label="Distancia" value={tour.distance || 'Consultar'} />
                </div>

                <p className="min-h-[96px] text-sm leading-7 text-gray-700">{tour.description}</p>

                {Array.isArray(tour.highlights) && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tour.highlights.slice(0, 4).map((highlight) => (
                      <span key={highlight} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-800">
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 grid gap-2">
                  <Link
                    href={`/tours/${tour.id}`}
                    className="rounded-full border border-[#071d14] px-5 py-3 text-center font-black text-[#071d14] transition hover:bg-[#071d14] hover:text-white"
                  >
                    Ver detalles
                  </Link>
                  <button
                    onClick={() => handleSelect(tour)}
                    className="rounded-full bg-[#071d14] px-5 py-3 font-black text-white transition hover:bg-green-900"
                  >
                    Reservar
                  </button>
                  <button
                    onClick={() => handleWhatsApp(tour)}
                    className="rounded-full px-5 py-3 font-black text-green-800 transition hover:bg-green-50"
                  >
                    Consultar por WhatsApp
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

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#f4efe3] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-black text-[#071d14]">{value}</p>
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
