'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

export default function TourMediaGallery({ images = [], videos = [], title, note }) {
  const gallery = useMemo(() => images.filter(Boolean), [images])
  const videoList = useMemo(() => videos.filter(Boolean), [videos])
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const activeImage = activeIndex === null ? null : gallery[activeIndex]
  const total = gallery.length

  const close = useCallback(() => {
    setActiveIndex(null)
    setZoomed(false)
  }, [])

  const open = useCallback((index) => {
    setActiveIndex(index)
    setZoomed(false)
  }, [])

  const goNext = useCallback(() => {
    if (!total) return
    setActiveIndex((index) => (index === null ? 0 : (index + 1) % total))
    setZoomed(false)
  }, [total])

  const goPrev = useCallback(() => {
    if (!total) return
    setActiveIndex((index) => (index === null ? total - 1 : (index - 1 + total) % total))
    setZoomed(false)
  }, [total])

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

  if (!gallery.length && !videoList.length) return null

  return (
    <>
      {videoList.length > 0 && (
        <div className="mb-5 grid gap-4 lg:grid-cols-2">
          {videoList.map((video) => (
            <video
              key={video}
              className="h-[420px] w-full rounded-[1.5rem] bg-black object-cover shadow-2xl"
              src={video}
              poster={gallery[0]}
              controls
              playsInline
            />
          ))}
        </div>
      )}

      {gallery.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => open(index)}
              className={`group relative block overflow-hidden rounded-[1.25rem] bg-[#071d14] text-left shadow-lg outline-none ring-0 transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-amber-300 ${
                getImageSizeClass(index)
              }`}
              aria-label={`Abrir foto ${index + 1} de ${title}`}
            >
              <Image
                src={image}
                alt={`${title} - foto ${index + 1}`}
                fill
                sizes={index < 2 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-80 transition group-hover:opacity-95" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-200">
                    Foto {String(index + 1).padStart(2, '0')}
                  </p>
                  {index === 0 && <p className="mt-1 text-lg font-black">Imagen principal</p>}
                </div>
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#071d14]">
                  Abrir
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeImage && (
        <div
          className="fixed inset-0 z-[90] bg-black/95 p-3 text-white sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${title}`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">
                {activeIndex + 1} / {total}
              </p>
              <h3 className="text-lg font-black sm:text-2xl">{title}</h3>
              {note && <p className="mt-1 hidden max-w-2xl text-sm text-white/60 sm:block">{note}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setZoomed((value) => !value)}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-black hover:bg-white/10"
              >
                {zoomed ? 'Ajustar' : 'Zoom'}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white px-4 py-2 text-sm font-black text-black"
                aria-label="Cerrar galería"
              >
                Cerrar
              </button>
            </div>
          </div>

          <div className="relative h-[calc(100vh-120px)] overflow-auto rounded-[1.25rem] bg-black">
            <Image
              src={activeImage}
              alt={`${title} - foto ampliada ${activeIndex + 1}`}
              fill={!zoomed}
              width={zoomed ? 1900 : undefined}
              height={zoomed ? 1300 : undefined}
              sizes="100vw"
              className={zoomed ? 'mx-auto h-auto min-h-full w-[150vw] max-w-none object-contain sm:w-[120vw]' : 'object-contain'}
              onDoubleClick={() => setZoomed((value) => !value)}
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-sm font-black text-black shadow-xl hover:bg-amber-100"
                  aria-label="Foto anterior"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-sm font-black text-black shadow-xl hover:bg-amber-100"
                  aria-label="Foto siguiente"
                >
                  Siguiente
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function getImageSizeClass(index) {
  if (index === 0) return 'h-[430px] md:col-span-2 lg:col-span-3 lg:row-span-2 lg:h-[560px]'
  if (index === 1) return 'h-[360px] lg:col-span-3'
  if (index === 2 || index === 3) return 'h-[270px] lg:col-span-3'
  return 'h-[250px] lg:col-span-2'
}
