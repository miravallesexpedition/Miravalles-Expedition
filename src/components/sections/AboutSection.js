import Image from 'next/image'
import { business, tourImages } from '@/lib/siteConfig'

export default function AboutSection() {
  const facts = [
    { label: 'Tour principal', value: '10 km' },
    { label: 'Duración base', value: '4 horas' },
    { label: 'Grupo ideal', value: '2-8 personas' },
    { label: 'Estilo', value: 'Local y auténtico' }
  ]

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative h-72 overflow-hidden rounded-lg">
            <Image
              src={tourImages.trailSign}
              alt="Sendero Cabro Muco"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative h-72 overflow-hidden rounded-lg sm:mt-10">
            <Image
              src={tourImages.cabroMucoFall}
              alt="Catarata Cabro Muco"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Sobre Miravalles Expedition
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Naturaleza real de Guanacaste, guiada por gente local
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            {business.positioning} La propuesta es sencilla: grupos pequeños, comunicación directa, rutas con identidad local y una experiencia honesta para viajeros que quieren ver algo más auténtico que los circuitos masivos.
          </p>
          <p className="mt-3 leading-7 text-gray-600">
            Antes de cada salida coordinamos punto de encuentro, clima, dificultad y recomendaciones para que el visitante sepa exactamente qué esperar.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">{fact.label}</p>
                <p className="text-xl font-bold text-gray-950">{fact.value}</p>
              </div>
            ))}
          </div>

          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded bg-gray-950 px-5 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Ver ubicación en Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
