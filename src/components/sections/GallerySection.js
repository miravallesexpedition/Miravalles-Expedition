'use client'

import Image from 'next/image'
import { galleryImages } from '@/lib/siteConfig'

export default function GallerySection() {
  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto mb-8 max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
          Fotos reales
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">Galería de Miravalles</h2>
        <p className="mt-3 max-w-2xl text-gray-600">
          Cataratas, aves, flores y paisajes de la zona para que el visitante vea lo que puede vivir.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative h-64 overflow-hidden rounded-lg shadow-lg transition hover:shadow-2xl">
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
