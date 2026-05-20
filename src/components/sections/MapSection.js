'use client'

import { business, contact } from '@/lib/siteConfig'

export default function MapSection() {
  return (
    <section className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
            Location
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
            Fortuna, Guanacaste. Close to Miravalles Volcano.
          </h2>
          <p className="mt-6 leading-8 text-white/70">
            The exact meeting point is confirmed after requesting a reservation. This keeps the experience organized and helps us adjust details based on weather and route conditions.
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
              Open Google Maps
            </a>
          </div>
        </div>

        <div className="min-h-[440px] overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl">
          <iframe
            src={business.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 440 }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación Miravalles Expedition"
          />
        </div>
      </div>
    </section>
  )
}
