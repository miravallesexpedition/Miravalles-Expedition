'use client'

import { track } from '@vercel/analytics'
import Image from 'next/image'
import { socialLinks, tourImages } from '@/lib/siteConfig'

const socialMetrics = [
  { label: 'Historias reales', value: 'Salidas' },
  { label: 'Naturaleza local', value: 'Aves' },
  { label: 'Contacto directo', value: 'WhatsApp' }
]

export default function SocialSection() {
  const handleClick = (social) => {
    track('social_link_click', { social: social.id })
  }

  return (
    <section id="redes" className="bg-white px-4 py-20 text-[#11130f] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
            Redes sociales
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
            Seguí la aventura antes de llegar.
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-700">
            Mirá videos, fotos recientes, aves, cataratas y momentos de ruta. También podés escribir directo para confirmar disponibilidad.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {socialMetrics.map((metric) => (
              <div key={metric.label} className="border-l-4 border-amber-400 bg-[#f8f4ea] px-4 py-3">
                <p className="text-xl font-black text-green-900">{metric.value}</p>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleClick(social)}
              className="group overflow-hidden rounded-[1.25rem] border border-black/10 bg-[#071d14] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`h-2 bg-gradient-to-r ${social.accent}`} />
              <div className="p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
                      {social.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{social.handle}</h3>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-[#071d14]">
                    {getSocialMark(social.id)}
                  </span>
                </div>
                <p className="mt-5 min-h-[56px] text-sm leading-7 text-white/70">{social.summary}</p>
                <span className="mt-5 inline-flex font-black text-amber-200 transition group-hover:translate-x-1">
                  Abrir perfil
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
        <Image
          src={tourImages.tigerHeron}
          alt="Garza tigre observada durante tour de aves"
          width={900}
          height={600}
          className="h-64 w-full rounded-[1.25rem] object-cover"
        />
        <Image
          src={tourImages.hero}
          alt="Catarata escondida de Miravalles"
          width={1400}
          height={900}
          className="h-64 w-full rounded-[1.25rem] object-cover md:col-span-2"
        />
      </div>
    </section>
  )
}

function getSocialMark(id) {
  const marks = {
    instagram: 'IG',
    facebook: 'FB',
    tiktok: 'TT',
    whatsapp: 'WA'
  }

  return marks[id] || 'ME'
}
