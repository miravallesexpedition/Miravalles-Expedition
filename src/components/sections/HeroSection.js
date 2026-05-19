'use client'

import { tourImages } from '@/lib/siteConfig'

export default function HeroSection({ onViewTours, onReserve }) {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url('${tourImages.hero}')` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative bg-black/60 p-8 rounded-lg text-center text-white max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">
          Tours en el Volcán Miravalles
        </h1>
        <p className="text-xl mb-6">
          Cataratas, aguas termales y aventura guiada segura
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onViewTours}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Ver Tours
          </button>
          <button
            onClick={onReserve}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Reservar Ahora
          </button>
        </div>
      </div>
    </section>
  )
}
