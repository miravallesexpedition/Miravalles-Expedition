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
    <section className="bg-stone-50 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Precios profesionales
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Tarifas diseñadas para vender sin perder rentabilidad
          </h2>
          <p className="mt-3 text-gray-600">
            La estrategia combina precios competitivos para turistas internacionales con una tarifa nacional accesible. El precio se comunica como experiencia guiada local, no como simple entrada a una catarata.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {pricingGuidelines.map((item) => (
            <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-green-700">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-950">Paquetes recomendados</h3>
            <p className="mt-1 text-gray-600">
              Opciones fáciles de entender para parejas, grupos pequeños y viajeros que buscan naturaleza auténtica.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item) => (
            <article key={item.name} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{item.bestFor}</p>
                  <h4 className="mt-1 text-xl font-bold text-gray-950">{item.name}</h4>
                </div>
                <p className="text-right text-lg font-bold text-green-700">{item.price}</p>
              </div>
              <p className="mb-5 text-sm leading-6 text-gray-600">{item.detail}</p>
              <button
                onClick={() => handlePackageClick(item)}
                className="w-full rounded bg-gray-950 px-4 py-2 font-semibold text-white hover:bg-gray-800"
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
