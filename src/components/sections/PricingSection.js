'use client'

import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, packages, pricingGuidelines } from '@/lib/siteConfig'

export default function PricingSection() {
  const handlePackageClick = (item) => {
    track('package_whatsapp_click', { package: item.name })
    const message = [
      `Hola, quiero información sobre el paquete ${item.name}.`,
      `Precio: ${item.price}`,
      'Me gustaría confirmar disponibilidad y punto de encuentro.'
    ].join('\n')
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
              Precios y paquetes
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
              Valor premium, precios claros y sin sorpresas.
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/70">
            La experiencia se presenta como aventura local guiada: grupos pequeños, preparación, seguridad y acceso a lugares que no se sienten como una parada masiva.
          </p>
        </div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {pricingGuidelines.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">{item.label}</p>
              <p className="mt-3 text-4xl font-black text-amber-200">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item) => (
            <article key={item.name} className="rounded-[1.5rem] bg-[#f8f4ea] p-6 text-[#11130f] shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{item.bestFor}</p>
              <h4 className="mt-3 text-2xl font-black">{item.name}</h4>
              <p className="mt-3 text-2xl font-black text-green-800">{item.price}</p>
              <p className="mt-4 min-h-[120px] text-sm leading-7 text-gray-700">{item.detail}</p>
              <button
                onClick={() => handlePackageClick(item)}
                className="mt-6 w-full rounded-full bg-[#071d14] px-4 py-3 font-black text-white transition hover:bg-green-900"
              >
                Consultar paquete
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
