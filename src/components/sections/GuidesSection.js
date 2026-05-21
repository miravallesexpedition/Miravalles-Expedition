import Image from 'next/image'
import { tourImages } from '@/lib/siteConfig'

const values = [
  {
    title: 'Conocimiento local',
    text: 'Leemos el sendero, el río, el clima y el ritmo de cada grupo antes de avanzar.'
  },
  {
    title: 'Ritmo humano',
    text: 'Los grupos pequeños dejan espacio para fotos, preguntas, descanso y conexión real con el lugar.'
  },
  {
    title: 'Aventura segura',
    text: 'Las rutas pueden cambiar por lluvia, nivel del agua o terreno. La seguridad va primero.'
  }
]

export default function GuidesSection() {
  return (
    <section id="guides" className="bg-[#f8f4ea] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
            Guías locales
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
            Exploración guiada por locales que cuidan la tierra y al visitante.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Miravalles Expedition nace de rutas locales, recomendaciones honestas y comunicación directa. La meta no es correr por una lista de paradas, sino vivir el paisaje con confianza.
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
