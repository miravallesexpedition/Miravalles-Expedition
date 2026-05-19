'use client'

import Image from 'next/image'
import { galleryImages } from '@/lib/siteConfig'

export default function GallerySection() {
  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Galería de Fotos</h2>
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {galleryImages.map((img, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition h-64">
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover hover:scale-110 transition"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
