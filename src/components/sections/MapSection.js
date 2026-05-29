'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { business, contact } from '@/lib/siteConfig'

export default function MapSection() {
  const [showMap, setShowMap] = useState(false)

  const handleLoadMap = () => {
    track('map_embed_load')
    setShowMap(true)
  }

  return (
    <section className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
            Ubicación
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
            Fortuna, Guanacaste. Cerca del Volcán Miravalles.
          </h2>
          <p className="mt-6 leading-8 text-white/70">
            El punto exacto de encuentro se confirma después de solicitar la reserva. Así mantenemos la experiencia ordenada y podemos ajustar detalles según clima y condiciones de la ruta.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
            <p className="font-black">{business.location}</p>
            <p className="mt-2 text-white/70">{contact.phoneDisplay}</p>
            <p className="text-white/70">{contact.email}</p>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full bg-amber-300 px-5 py-3 font-black text-[#071d14] transition hover:bg-amber-200"
            >
              Abrir Google Maps
            </a>
          </div>
        </div>

        <div className="min-h-[440px] overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl">
          {showMap ? (
            <iframe
              src={business.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 440 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Miravalles Expedition"
            />
          ) : (
            <div className="flex min-h-[440px] flex-col items-center justify-center gap-5 p-8 text-center">
              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                Fortuna, Bagaces
              </div>
              <h3 className="max-w-md text-balance text-3xl font-black leading-tight">
                Ubicá la zona de encuentro antes de reservar.
              </h3>
              <p className="max-w-md text-sm leading-7 text-white/70">
                El punto final se confirma después de revisar clima, tour elegido y condiciones de la ruta.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadMap}
                  className="rounded-full bg-amber-300 px-6 py-3 font-black text-[#071d14] transition hover:bg-amber-200"
                >
                  Ver mapa interactivo
                </button>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 font-black text-white transition hover:bg-white/10"
                >
                  Abrir Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
