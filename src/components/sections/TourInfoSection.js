import { business, experienceDetails } from '@/lib/siteConfig'

export default function TourInfoSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Antes de reservar
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Información clara para viajar con confianza
          </h2>
          <p className="mt-3 text-gray-600">
            {business.noTransportNotice}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experienceDetails.map((section) => (
            <div key={section.title} className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <h3 className="mb-3 text-lg font-bold text-gray-950">{section.title}</h3>
              <ul className="space-y-2 text-sm leading-6 text-gray-700">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
