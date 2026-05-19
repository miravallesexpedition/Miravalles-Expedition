'use client'

import Image from 'next/image'
import { track } from '@vercel/analytics'
import { business, tourImages } from '@/lib/siteConfig'

export default function HeroSection({ onViewTours, onReserve }) {
  const handleViewTours = () => {
    track('hero_view_tours_click')
    onViewTours()
  }

  const handleReserve = () => {
    track('hero_reserve_click')
    onReserve()
  }

  return (
    <section
      className="relative flex min-h-[88vh] items-center bg-cover bg-center px-4 py-20 sm:px-6 lg:px-10"
      style={{ backgroundImage: `url('${tourImages.hero}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <div className="relative mx-auto w-full max-w-6xl text-white">
        <div className="max-w-3xl">
          <Image
            src={tourImages.logo}
            alt="Miravalles Expedition"
            width={220}
            height={220}
            priority
            className="mb-6 h-32 w-32 rounded bg-white object-contain p-2 shadow-lg sm:h-40 sm:w-40"
          />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">
            {business.location}
          </p>
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Miravalles Expedition
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-white/90">
            Caminatas hacia cataratas escondidas, aguas termales, aves y experiencias locales cerca del Volcán Miravalles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleViewTours}
              className="rounded bg-white px-6 py-3 font-bold text-gray-950 hover:bg-amber-100"
            >
              Ver precios y tours
            </button>
            <button
              onClick={handleReserve}
              className="rounded border border-white px-6 py-3 font-bold text-white hover:bg-white/10"
            >
              Reservar ahora
            </button>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/90 sm:grid-cols-3">
            <p className="border-l-2 border-amber-300 pl-3">Guía local, agua y refrigerio incluidos</p>
            <p className="border-l-2 border-amber-300 pl-3">Tour principal de 10 km ida y vuelta</p>
            <p className="border-l-2 border-amber-300 pl-3">Sin transporte incluido</p>
          </div>
        </div>
      </div>
    </section>
  )
}
