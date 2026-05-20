import { business, experienceDetails } from '@/lib/siteConfig'

export default function TourInfoSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              What to Expect
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
              Clear details before the adventure starts.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            {business.noTransportNotice} Every booking is coordinated directly so visitors understand the terrain, weather, difficulty and meeting point.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experienceDetails.map((section, index) => (
            <article
              key={section.title}
              className={`rounded-[1.5rem] border p-6 ${
                index === 0
                  ? 'border-[#071d14] bg-[#071d14] text-white'
                  : 'border-gray-200 bg-[#f8f4ea] text-[#11130f]'
              }`}
            >
              <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] opacity-70">
                0{index + 1}
              </p>
              <h3 className="mb-4 text-2xl font-black">{section.title}</h3>
              <ul className="space-y-3 text-sm leading-6 opacity-85">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
