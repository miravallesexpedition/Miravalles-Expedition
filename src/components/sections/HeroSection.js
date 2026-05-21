'use client'

import Image from 'next/image'
import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, business, heroBadges, tourImages } from '@/lib/siteConfig'

export default function HeroSection({ onViewTours, onReserve }) {
  const handleViewTours = () => {
    track('hero_view_tours_click')
    onViewTours()
  }

  const handleReserve = () => {
    track('hero_reserve_click')
    onReserve()
  }

  const handleWhatsApp = () => {
    track('hero_whatsapp_click')
    window.open(
      buildWhatsAppUrl('Hola, quiero vivir una aventura con Miravalles Expedition.'),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#061b13] text-white">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover opacity-70"
        src={tourImages.heroVideo}
        poster={tourImages.hero}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(11,93,107,0.26),transparent_38%),linear-gradient(90deg,rgba(2,12,8,0.95),rgba(2,12,8,0.72)_42%,rgba(2,12,8,0.2))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061b13] to-transparent" />

      <div className="section-shell relative flex min-h-screen items-center pt-28">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div className="max-w-4xl reveal-soft">
            <Image
              src={tourImages.logo}
              alt="Logo de Miravalles Expedition"
              width={140}
              height={140}
              priority
              className="mb-6 h-24 w-24 rounded-2xl bg-white object-contain p-3 shadow-2xl sm:h-32 sm:w-32"
            />
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-100 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              {business.location}
            </div>

            <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Cataratas escondidas. Guías locales. Costa Rica real.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Explorá senderos volcánicos, pozas cristalinas y paisajes tropicales alrededor de Miravalles con un equipo local enfocado en seguridad, grupos pequeños y aventura auténtica.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleReserve}
                className="rounded-full bg-amber-300 px-8 py-4 text-base font-black text-[#071d14] shadow-2xl shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-200"
              >
                Reservar aventura
              </button>
              <button
                onClick={handleWhatsApp}
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                WhatsApp
              </button>
              <button
                onClick={handleViewTours}
                className="rounded-full px-8 py-4 text-base font-black text-white/90 transition hover:text-amber-200"
              >
                Ver tours
              </button>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {heroBadges.map((badge) => (
                <div key={badge} className="cinematic-panel rounded-2xl px-4 py-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-100">{badge}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="cinematic-panel hidden rounded-[2rem] p-6 lg:block">
            <Image
              src={tourImages.logo}
              alt="Miravalles Expedition"
              width={420}
              height={420}
              priority
              className="aspect-square w-full rounded-[1.4rem] bg-white object-contain p-7"
            />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Metric value="10 km" label="Caminata principal" />
              <Metric value="4 h" label="Duración base" />
              <Metric value="2-10" label="Grupo ideal" />
              <Metric value="Local" label="Guiado" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-2xl font-black text-amber-200">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">{label}</p>
    </div>
  )
}
