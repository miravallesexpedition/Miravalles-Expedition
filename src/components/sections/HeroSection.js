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
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#f6f2e8] px-4 py-20 sm:px-6 lg:px-10">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <Image
          src={tourImages.logo}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain p-8 sm:p-12 lg:p-16"
        />
      </div>
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-green-950/95 lg:block" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_420px]">
        <div className="max-w-3xl text-gray-950">
          <Image
            src={tourImages.logo}
            alt="Miravalles Expedition"
            width={360}
            height={360}
            priority
            className="mb-7 h-44 w-44 rounded bg-white object-contain p-3 shadow-xl ring-1 ring-black/10 sm:h-56 sm:w-56"
          />
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-green-800">
            {business.location}
          </p>
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Miravalles Expedition
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-gray-700">
            Caminatas hacia cataratas escondidas, aguas termales, aves y experiencias locales cerca del Volcán Miravalles.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleViewTours}
              className="rounded bg-green-800 px-6 py-3 font-bold text-white hover:bg-green-900"
            >
              Ver precios y tours
            </button>
            <button
              onClick={handleReserve}
              className="rounded border border-green-800 px-6 py-3 font-bold text-green-900 hover:bg-green-50"
            >
              Reservar ahora
            </button>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-gray-700 sm:grid-cols-3">
            <p className="border-l-2 border-amber-500 pl-3">Guía local, agua y refrigerio incluidos</p>
            <p className="border-l-2 border-amber-500 pl-3">Tour principal de 10 km ida y vuelta</p>
            <p className="border-l-2 border-amber-500 pl-3">Sin transporte incluido</p>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Image
            src={tourImages.logo}
            alt="Logo Miravalles Expedition"
            width={520}
            height={520}
            priority
            className="ml-auto aspect-square w-full rounded bg-white object-contain p-8 shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
