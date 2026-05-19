'use client'

import Image from 'next/image'
import { tourImages } from '@/lib/siteConfig'

export default function GallerySection() {
  const images = [
    { url: tourImages.volcan, alt: 'Volcán Miravalles' },
    { url: tourImages.termales, alt: 'Aguas Termales' },
    { url: tourImages.cataratas, alt: 'Cataratas' },
    { url: tourImages.naturaleza, alt: 'Naturaleza' },
    { url: tourImages.aventura, alt: 'Aventura' },
    { url: tourImages.grupo, alt: 'Grupo' },
  ]

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Galería de Fotos</h2>
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition h-64">
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover hover:scale-110 transition"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
