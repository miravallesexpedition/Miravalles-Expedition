'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/lib/siteConfig'

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const activeImage = activeIndex === null ? null : galleryImages[activeIndex]

  useEffect(() => {
    const handleKey = (event) => {
      if (activeIndex === null) return
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const open = (index) => {
    setActiveIndex(index)
    setZoomed(false)
  }

  const close = () => {
    setActiveIndex(null)
    setZoomed(false)
  }

  const goNext = () => {
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % galleryImages.length))
    setZoomed(false)
  }

  const goPrev = () => {
    setActiveIndex((index) => (index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length))
    setZoomed(false)
  }

  return (
    <section id="gallery" className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
              Premium Gallery
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
              Real Miravalles, framed like an expedition journal.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/70">
            Open any image, navigate full screen and zoom in on the details. Every visual comes from the local landscape and real experience.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, index) => (
            <button
              key={img.url}
              onClick={() => open(index)}
              className={`group relative mb-4 block w-full overflow-hidden rounded-[1.5rem] bg-white/5 text-left shadow-2xl ${
                img.featured ? 'h-[420px]' : 'h-[300px]'
              }`}
              aria-label={`Open ${img.alt}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-95" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <p className="font-black text-white">{img.caption}</p>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#071d14]">
                  Open
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-[80] bg-black/95 p-3 text-white sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                {activeIndex + 1} / {galleryImages.length}
              </p>
              <h3 className="text-lg font-black sm:text-2xl">{activeImage.caption}</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setZoomed((value) => !value)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-black hover:bg-white/10"
              >
                {zoomed ? 'Fit' : 'Zoom'}
              </button>
              <button
                onClick={close}
                className="rounded-full bg-white px-4 py-2 text-sm font-black text-black"
              >
                Close
              </button>
            </div>
          </div>

          <div className="relative h-[calc(100vh-120px)] overflow-auto rounded-[1.5rem] bg-black">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill={!zoomed}
              width={zoomed ? 1800 : undefined}
              height={zoomed ? 1200 : undefined}
              sizes="100vw"
              className={zoomed ? 'mx-auto h-auto min-h-full w-[150vw] max-w-none object-contain sm:w-[120vw]' : 'object-contain'}
              onDoubleClick={() => setZoomed((value) => !value)}
            />
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 rounded-full bg-white/90 px-4 py-3 font-black text-black shadow-xl"
              aria-label="Previous image"
            >
              Prev
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 rounded-full bg-white/90 px-4 py-3 font-black text-black shadow-xl"
              aria-label="Next image"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
