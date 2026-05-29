import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import TourMediaGallery from '@/components/sections/TourMediaGallery'
import { parseMoney } from '@/lib/pricing'
import { buildWhatsAppUrl, business, contact, getTourById, tours, tourImages } from '@/lib/siteConfig'

const baseUrl = 'https://miravallesexpedition.com'

export function generateStaticParams() {
  return tours.map((tour) => ({ tourId: tour.id }))
}

export async function generateMetadata({ params }) {
  const { tourId } = await params
  const tour = getTourById(tourId)

  if (!tour) {
    return {
      title: 'Tour no encontrado'
    }
  }

  return {
    title: `${tour.name} | Tour de aventura en Guanacaste`,
    description: `${tour.description} Duración: ${tour.duration}. Dificultad: ${tour.level}. Precio desde ${tour.priceLabel}.`,
    alternates: {
      canonical: `/tours/${tour.id}`
    },
    openGraph: {
      title: `${tour.name} | Miravalles Expedition`,
      description: tour.description,
      images: [{ url: tour.image, alt: tour.name }]
    }
  }
}

export default async function TourDetailPage({ params }) {
  const { tourId } = await params
  const tour = getTourById(tourId)
  if (!tour) notFound()

  const secondaryPrice = getSecondaryPrice(tour)
  const whatsappMessage = [
    `Hola, quiero reservar el tour ${tour.name}.`,
    `Fecha deseada:`,
    `Cantidad de personas:`,
    tour.pricing?.general ? `Precio base: ${tour.priceLabel}` : `Tarifa extranjera base: ${tour.priceLabel}`,
    secondaryPrice.message,
    'Quiero confirmar disponibilidad y punto de encuentro.'
  ].join('\n')

  return (
    <main id="contenido-principal" className="bg-[#f8f4ea] text-[#11130f]">
      <TourStructuredData tour={tour} />
      <TourNav />

      <section className="relative min-h-[88vh] overflow-hidden bg-[#061b13] text-white">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="bg-[#061b13] object-contain sm:object-cover"
          style={{ objectPosition: tour.coverPosition || 'center center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061b13] to-transparent" />

        <div className="section-shell relative flex min-h-[88vh] items-end pb-14 pt-28">
          <div className="max-w-4xl">
            <Link href="/#tours" className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/10">
              Volver a tours
            </Link>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
              {tour.location}
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black leading-[0.95] sm:text-7xl">
              {tour.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{tour.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-amber-300 px-8 py-4 text-center font-black text-[#071d14] hover:bg-amber-200"
              >
                Reservar por WhatsApp
              </a>
              <Link
                href="/#book"
                className="rounded-full border border-white/25 px-8 py-4 text-center font-black text-white hover:bg-white/10"
              >
                Ver reserva
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061b13] px-4 pb-20 text-white sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Metric label="Duración" value={tour.duration} />
          <Metric label="Distancia" value={tour.distance || 'Consultar'} />
          <Metric label="Dificultad" value={tour.level} />
          <Metric label="Desde" value={tour.priceLabel} />
          <Metric label={secondaryPrice.label} value={secondaryPrice.value} />
          <Metric label="Transporte" value="No incluido" />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Resumen de experiencia
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight">
              Por qué esta experiencia vale la pena.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-gray-700">
            <p>{tour.overview}</p>
            <p>{business.noTransportNotice}</p>
          </div>
        </div>
      </section>

      <InfoGrid tour={tour} />
      <Itinerary tour={tour} />
      <MediaSection tour={tour} />
      <TourFaq tour={tour} />
      <BookingBand tour={tour} whatsappMessage={whatsappMessage} />

      <footer className="bg-[#020806] p-8 text-center text-sm text-white/70">
        <p className="font-bold text-white">Miravalles Expedition</p>
        <p className="mt-2">{contact.phoneDisplay} | {contact.email}</p>
      </footer>
    </main>
  )
}

function TourStructuredData({ tour }) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/tours/${tour.id}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tours',
            item: `${baseUrl}/#tours`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tour.name,
            item: `${baseUrl}/tours/${tour.id}`
          }
        ]
      },
      {
        '@type': 'TouristTrip',
        '@id': `${baseUrl}/tours/${tour.id}#tour`,
        mainEntityOfPage: `${baseUrl}/tours/${tour.id}`,
        name: tour.name,
        description: tour.description,
        image: `${baseUrl}${tour.image}`,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${baseUrl}/#business`,
          name: business.name,
          telephone: contact.phoneDisplay,
          email: contact.email
        },
        offers: {
          '@type': 'Offer',
          price: getStructuredPrice(tour),
          priceCurrency: getStructuredCurrency(tour),
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/tours/${tour.id}`
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Duración', value: tour.duration },
          { '@type': 'PropertyValue', name: 'Distancia', value: tour.distance || 'Consultar' },
          { '@type': 'PropertyValue', name: 'Dificultad', value: tour.level },
          { '@type': 'PropertyValue', name: 'Transporte', value: 'No incluido' }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function getStructuredPrice(tour) {
  return parseMoney(tour.pricing?.general || tour.pricing?.foreignAdult || tour.priceLabel) || Number(tour.price || 0)
}

function getStructuredCurrency(tour) {
  const label = String(tour.pricing?.general || tour.pricing?.foreignAdult || tour.priceLabel || '')
  return label.includes('₡') || /\d{1,3}(?:\.\d{3})+/.test(label) ? 'CRC' : 'USD'
}

function TourNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061b13]/80 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={tourImages.logo} alt="Miravalles Expedition" width={48} height={48} className="h-12 w-12 rounded bg-white object-contain p-1" />
          <span className="text-sm font-black uppercase tracking-[0.25em]">Miravalles</span>
        </Link>
        <Link href="/#tours" className="rounded-full bg-white px-5 py-2 text-sm font-black text-[#071d14]">
          Todos los tours
        </Link>
      </div>
    </header>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/10 p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  )
}

function getSecondaryPrice(tour) {
  if (tour.pricing?.nationalAdult) {
    return {
      label: 'Nacional',
      value: tour.pricing.nationalAdult,
      message: `Tarifa nacional/residente: ${tour.pricing.nationalAdult}`
    }
  }

  if (tour.pricing?.general) {
    return {
      label: 'General',
      value: tour.pricing.general,
      message: `Precio general: ${tour.pricing.general}`
    }
  }

  return {
    label: 'Precio',
    value: 'Consultar',
    message: 'Precio: consultar'
  }
}

function InfoGrid({ tour }) {
  const sections = [
    { title: 'Qué esperar', items: tour.whatToExpect, span: 'lg:col-span-4', tone: 'dark' },
    { title: 'Precio', items: buildPricingItems(tour), span: 'lg:col-span-2', tone: 'price' },
    { title: 'Qué incluye', items: tour.includes, span: 'lg:col-span-3' },
    { title: 'Qué no incluye', items: tour.notIncluded, span: 'lg:col-span-3' },
    { title: 'Qué llevar', items: tour.bring, span: 'lg:col-span-3' },
    { title: 'Seguridad', items: tour.safety, span: 'lg:col-span-3' },
    { title: 'Destacados', items: tour.highlights, span: 'lg:col-span-6', tone: 'highlights' }
  ]

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">Detalles del tour</p>
            <h2 className="mt-4 text-4xl font-black">Todo claro antes de reservar.</h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            Organizamos la información por prioridad: primero experiencia y precio, luego inclusiones, preparación y seguridad.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {sections.map((section) => (
            <article key={section.title} className={`${section.span} rounded-[1.25rem] border p-6 ${getInfoCardClass(section.tone)}`}>
              <h3 className="text-xl font-black">{section.title}</h3>
              <ul className={`mt-4 ${section.tone === 'highlights' ? 'flex flex-wrap gap-2 space-y-0' : 'space-y-3'} text-sm leading-7 ${section.tone === 'dark' ? 'text-white/75' : 'text-gray-700'}`}>
                {(section.items || ['Información pendiente de completar.']).map((item) => (
                  <li key={item} className={section.tone === 'highlights' ? 'rounded-full bg-white px-4 py-2 font-black text-green-900 shadow-sm' : 'flex gap-3'}>
                    {section.tone !== 'highlights' && (
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${section.tone === 'dark' ? 'bg-amber-300' : 'bg-amber-500'}`} />
                    )}
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

function getInfoCardClass(tone) {
  if (tone === 'dark') return 'border-[#071d14] bg-[#071d14] text-white shadow-2xl'
  if (tone === 'price') return 'border-amber-200 bg-amber-50 text-[#11130f]'
  if (tone === 'highlights') return 'border-green-900/10 bg-[#eef4e9] text-[#11130f]'
  return 'border-gray-200 bg-[#f8f4ea] text-[#11130f]'
}

function buildPricingItems(tour) {
  if (tour.pricing?.general) {
    return [
      `Precio general: ${tour.pricing.general}`,
      tour.pricing?.custom && `Ruta especial: ${tour.pricing.custom}`,
      tour.pricing?.private && `Privado: ${tour.pricing.private}`,
      tour.pricing?.promo && `Promoción: ${tour.pricing.promo}`
    ].filter(Boolean)
  }

  return [
    tour.pricing?.foreignAdult && `Adulto extranjero: ${tour.pricing.foreignAdult}`,
    tour.pricing?.foreignChild && `Niño extranjero: ${tour.pricing.foreignChild}`,
    tour.pricing?.nationalAdult && `Nacional/residente: ${tour.pricing.nationalAdult}`,
    tour.pricing?.nationalChild && `Niño nacional: ${tour.pricing.nationalChild}`,
    tour.pricing?.group && `Grupo: ${tour.pricing.group}`,
    tour.pricing?.private && `Privado: ${tour.pricing.private}`,
    tour.pricing?.promo && `Promoción: ${tour.pricing.promo}`
  ].filter(Boolean)
}

function Itinerary({ tour }) {
  return (
    <section className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">Itinerario</p>
        <h2 className="mt-4 text-4xl font-black">Un ritmo claro para el día.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(tour.itinerary || []).map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MediaSection({ tour }) {
  const videos = Array.isArray(tour.videos) && tour.videos.length
    ? tour.videos
    : (tour.video ? [tour.video] : [])
  const mediaNote = tour.id === 'aguas-termales-miravalles'
    ? 'Fotos propias de Miravalles Expedition para Termales El Guayacán: piscinas, áreas de descanso, barro volcánico, mirador y entorno geotérmico.'
    : 'Material visual real de Miravalles. Las fotos y videos muestran la ruta de cataratas, pozas naturales y el entorno volcánico.'

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">Galería y video</p>
            <h2 className="mt-4 text-4xl font-black">Mirá el terreno antes de llegar.</h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">{mediaNote}</p>
        </div>

        <TourMediaGallery
          images={tour.gallery || [tour.image]}
          videos={videos}
          title={tour.name}
          note={mediaNote}
        />
      </div>
    </section>
  )
}

function TourFaq({ tour }) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">Preguntas y reseñas</p>
        <h2 className="mt-4 text-4xl font-black">Últimas dudas antes de reservar.</h2>
        <div className="mt-8 space-y-4">
          {(tour.faqs || []).map((faq) => (
            <article key={faq.question} className="rounded-[1.5rem] bg-[#f8f4ea] p-6">
              <h3 className="font-black">{faq.question}</h3>
              <p className="mt-2 leading-7 text-gray-700">{faq.answer}</p>
            </article>
          ))}
          <article className="rounded-[1.5rem] border border-green-900/10 bg-white p-6">
            <h3 className="font-black">Confianza antes de salir</h3>
            <p className="mt-2 leading-7 text-gray-700">
              Antes de confirmar revisamos clima, nivel del grupo, punto de encuentro y recomendaciones. Este espacio se reservará para reseñas verificadas de clientes cuando estén listas para publicarse.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

function BookingBand({ tour, whatsappMessage }) {
  return (
    <section className="bg-[#f8f4ea] px-4 py-20 text-center sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#071d14] p-8 text-white shadow-2xl sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">Reservá tu aventura</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight">
          ¿Listo para {tour.shortName || tour.name}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Enviá una solicitud rápida por WhatsApp y confirmá fecha, tamaño del grupo, clima y punto de encuentro directamente con Miravalles Expedition.
        </p>
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-amber-300 px-8 py-4 font-black text-[#071d14] hover:bg-amber-200"
        >
          Reservar por WhatsApp
        </a>
      </div>
    </section>
  )
}
