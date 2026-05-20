import Image from 'next/image'
import { tourImages } from '@/lib/siteConfig'

const values = [
  {
    title: 'Local knowledge',
    text: 'We read the trail, the river, the weather and the rhythm of each group before pushing forward.'
  },
  {
    title: 'Human pace',
    text: 'Small groups leave space for photos, questions, rest and real connection with the place.'
  },
  {
    title: 'Safe adventure',
    text: 'Routes can change with rain, water levels and terrain. Safety comes before the photo.'
  }
]

export default function GuidesSection() {
  return (
    <section id="guides" className="bg-[#f8f4ea] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
            Meet your local guides
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
            Exploration guided by locals who care about the land and the visitor.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Miravalles Expedition is built around local routes, honest recommendations and direct communication. The goal is not to rush people through a checklist, but to help them experience the landscape with confidence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((item) => (
            <article key={item.title} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-gray-700">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="overflow-hidden rounded-[2rem] lg:col-span-2">
          <Image
            src={tourImages.forestTrail}
            alt="Sendero de bosque en Miravalles"
            width={1600}
            height={800}
            className="h-[360px] w-full object-cover sm:h-[460px]"
          />
        </div>
      </div>
    </section>
  )
}
