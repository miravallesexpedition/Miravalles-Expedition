'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/lib/siteConfig'

const PREVIEW_COUNT = 5

export default function GallerySection({ variant = 'preview' }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const isFull = variant === 'full'
  const displayImages = isFull
    ? galleryImages
    : galleryImages.filter((image) => image.featured).slice(0, PREVIEW_COUNT)
  const activeImage = activeIndex === null ? null : displayImages[activeIndex]

  const open = useCallback((index) => {
    setActiveIndex(index)
    setZoomed(false)
  }, [])

  const close = useCallback(() => {
    setActiveIndex(null)
    setZoomed(false)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % displayImages.length))
    setZoomed(false)
  }, [displayImages.length])

  const goPrev = useCallback(() => {
    setActiveIndex((index) => (index === null ? 0 : (index - 1 + displayImages.length) % displayImages.length))
    setZoomed(false)
  }, [displayImages.length])

  useEffect(() => {
    if (activeIndex === null) return undefined

    const handleKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, close, goNext, goPrev])

  useEffect(() => {
    if (activeIndex === null) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  return (
    <section id={isFull ? undefined : 'gallery'} className={`bg-[#071d14] px-4 text-white sm:px-6 lg:px-10 ${isFull ? 'py-16' : 'py-14'}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
              {isFull ? 'Galería completa' : 'Galería'}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
              {isFull ? 'Todo el material visual en un solo lugar.' : 'Una muestra breve para abrir el apetito.'}
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-lg leading-8 text-white/70">
              {isFull
                ? 'Abrí cualquier imagen, navegá en pantalla completa y acercate a los detalles. Todo el material visual es propio de Miravalles Expedition.'
                : 'Una selección rápida de escenas reales: cataratas, termales, aves y volcán. La colección completa está lista para verla con calma en la galería dedicada.'}
            </p>
            {!isFull && (
              <Link
                href="/galeria"
                className="inline-flex rounded-full bg-amber-300 px-6 py-3 font-black text-[#071d14] transition hover:bg-amber-200"
              >
                Ver galería completa
              </Link>
            )}
          </div>
        </div>

        {isFull ? (
          <FullGalleryGrid images={displayImages} onOpen={open} />
        ) : (
          <PreviewGalleryGrid images={displayImages} onOpen={open} />
        )}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] bg-black/95 p-3 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería: ${activeImage.caption}`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                {activeIndex + 1} / {displayImages.length}
              </p>
              <h3 className="text-lg font-black sm:text-2xl">{activeImage.caption}</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setZoomed((value) => !value)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-black hover:bg-white/10"
              >
                {zoomed ? 'Ajustar' : 'Acercar'}
              </button>
              <button
                onClick={close}
                className="rounded-full bg-white px-4 py-2 text-sm font-black text-black"
                aria-label="Cerrar galería"
              >
                Cerrar
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
              quality={88}
              className={zoomed ? 'mx-auto h-auto min-h-full w-[150vw] max-w-none object-contain sm:w-[120vw]' : 'object-contain'}
              onDoubleClick={() => setZoomed((value) => !value)}
            />
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 rounded-full bg-white/90 px-4 py-3 font-black text-black shadow-xl"
              aria-label="Imagen anterior"
            >
              Anterior
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 rounded-full bg-white/90 px-4 py-3 font-black text-black shadow-xl"
              aria-label="Imagen siguiente"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function PreviewGalleryGrid({ images, onOpen }) {
  return (
    <div className="grid gap-4 md:auto-rows-[220px] md:grid-cols-4">
      {images.map((img, index) => (
        <GalleryButton
          key={`${img.url}-${index}`}
          image={img}
          index={index}
          onOpen={onOpen}
          className={index === 0 ? 'h-[340px] md:col-span-2 md:row-span-2 md:h-auto' : 'h-[220px] md:h-auto'}
          sizes={index === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 100vw'}
        />
      ))}
    </div>
  )
}

function FullGalleryGrid({ images, onOpen }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((img, index) => (
        <GalleryButton
          key={`${img.url}-${index}`}
          image={img}
          index={index}
          onOpen={onOpen}
          className={`mb-4 block w-full ${img.featured ? 'h-[420px]' : 'h-[300px]'}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ))}
    </div>
  )
}

function GalleryButton({ image, index, onOpen, className, sizes }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group relative overflow-hidden rounded-[1.5rem] bg-white/5 text-left shadow-2xl ${className}`}
      aria-label={`Abrir ${image.alt}`}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={76}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-95" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <p className="font-black text-white">{image.caption}</p>
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#071d14]">
          Abrir
        </span>
      </div>
    </button>
  )
}
