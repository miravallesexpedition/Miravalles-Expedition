import Image from 'next/image'
import { business, tourImages } from '@/lib/siteConfig'

const proofPoints = [
  { label: 'Sendero principal', value: '10 km' },
  { label: 'Duración base', value: '4 horas' },
  { label: 'Tipo de grupo', value: '2-10 personas' },
  { label: 'Transporte', value: 'No incluido' }
]

export default function AboutSection() {
  return (
    <section id="overview" className="bg-[#061b13] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[520px]">
          <div className="absolute left-0 top-8 h-72 w-[62%] overflow-hidden rounded-[1.75rem] shadow-2xl">
            <Image
              src={tourImages.trailSign}
              alt="Sendero Cabro Muco"
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-0 h-96 w-[70%] overflow-hidden rounded-[1.75rem] border-8 border-[#061b13] shadow-2xl">
            <Image
              src={tourImages.cabroMucoFall}
              alt="Catarata Cabro Muco"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-8 rounded-2xl bg-amber-300 px-5 py-4 text-[#071d14] shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em]">Acceso local</p>
            <p className="mt-1 text-2xl font-black">Rutas escondidas</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
            Experiencia local
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight sm:text-5xl">
            Aventura premium guiada por personas que conocen Miravalles desde adentro.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/75">
            {business.positioning} La experiencia se construye con grupos pequeños, comunicación directa y rutas que mantienen la autenticidad local.
          </p>
          <p className="mt-4 leading-8 text-white/70">
            Antes de cada salida coordinamos clima, punto de encuentro, dificultad y recomendaciones para que el visitante sepa exactamente qué esperar.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {proofPoints.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">{item.label}</p>
                <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-black text-[#071d14] transition hover:bg-amber-100"
          >
            Ver ubicación en Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
