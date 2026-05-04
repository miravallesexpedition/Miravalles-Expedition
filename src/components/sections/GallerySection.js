'use client'

import Image from 'next/image'

export default function GallerySection() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300', alt: 'Volcán Miravalles' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300', alt: 'Aguas Termales' },
    { url: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=400&h=300', alt: 'Cataratas' },
    { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300', alt: 'Naturaleza' },
    { url: 'https://images.unsplash.com/photo-1491904014055-e4835cdcd4c6?w=400&h=300', alt: 'Aventura' },
    { url: 'https://images.unsplash.com/photo-1520763185298-1b434c919eba?w=400&h=300', alt: 'Grupo' },
  ]

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Galería de Fotos</h2>
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition h-64">
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
