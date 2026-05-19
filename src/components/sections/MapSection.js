'use client'

import { business, contact } from '@/lib/siteConfig'

export default function MapSection() {
  return (
    <section className="bg-gray-100 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Ubicación
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950">Fortuna, Guanacaste</h2>
          <p className="mt-2 text-gray-600">
            Cerca del Volcán Miravalles. El punto de encuentro exacto se confirma al reservar.
          </p>
        </div>
        <div className="h-96 overflow-hidden rounded-lg bg-gray-300 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.4896814155557!2d-85.39168342345813!3d10.747800859055846!2m3!1f0!2f0!3f0!2m3!1m2!1sVolc%C3%A1n%20Miravalles!5e0!3m2!1ses!2scr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Ubicación Volcán Miravalles"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">{business.location}</p>
          <p className="text-gray-500">{contact.phoneDisplay}</p>
          <p className="text-gray-500">{contact.email}</p>
        </div>
      </div>
    </section>
  )
}
