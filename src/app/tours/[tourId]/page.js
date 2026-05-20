import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildWhatsAppUrl, business, contact, getTourById, tours, tourImages } from '@/lib/siteConfig'

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
    title: `${tour.name} | Adventure Tour in Guanacaste`,
    description: `${tour.description} Duration: ${tour.duration}. Difficulty: ${tour.level}. Price from ${tour.priceLabel}.`,
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

  const whatsappMessage = [
    `Hola, quiero reservar el tour ${tour.name}.`,
    `Fecha deseada:`,
    `Cantidad de personas:`,
    `Tarifa extranjera base: ${tour.priceLabel}`,
    `Tarifa nacional/residente: ${tour.pricing?.nationalAdult || 'Consultar'}`,
    'Quiero confirmar disponibilidad y punto de encuentro.'
  ].join('\n')

  return (
    <main className="bg-[#f8f4ea] text-[#11130f]">
      <TourNav />

      <section className="relative min-h-[88vh] overflow-hidden bg-[#061b13] text-white">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061b13] to-transparent" />

        <div className="section-shell relative flex min-h-[88vh] items-end pb-14 pt-28">
          <div className="max-w-4xl">
            <Link href="/#tours" className="mb-6 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/10">
              Back to tours
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
                Book Now / WhatsApp
              </a>
              <Link
                href="/#book"
                className="rounded-full border border-white/25 px-8 py-4 text-center font-black text-white hover:bg-white/10"
              >
                Booking flow
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061b13] px-4 pb-20 text-white sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Metric label="Duration" value={tour.duration} />
          <Metric label="Distance" value={tour.distance || 'Ask'} />
          <Metric label="Difficulty" value={tour.level} />
          <Metric label="From" value={tour.priceLabel} />
          <Metric label="National" value={tour.pricing?.nationalAdult || 'Ask'} />
          <Metric label="Transport" value="Not included" />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Experience Overview
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight">
              What makes this experience worth booking.
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

function TourNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061b13]/80 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src={tourImages.logo} alt="Miravalles Expedition" width={48} height={48} className="h-12 w-12 rounded bg-white object-contain p-1" />
          <span className="text-sm font-black uppercase tracking-[0.25em]">Miravalles</span>
        </Link>
        <Link href="/#tours" className="rounded-full bg-white px-5 py-2 text-sm font-black text-[#071d14]">
          All tours
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

function InfoGrid({ tour }) {
  const sections = [
    { title: 'What to Expect', items: tour.whatToExpect },
    { title: 'Highlights', items: tour.highlights },
    { title: 'Price', items: buildPricingItems(tour) },
    { title: "What's Included", items: tour.includes },
    { title: "What's Not Included", items: tour.notIncluded },
    { title: 'What to Bring', items: tour.bring },
    { title: 'Safety Information', items: tour.safety }
  ]

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">Tour Details</p>
          <h2 className="mt-4 text-4xl font-black">Everything organized before you book.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-[1.5rem] border border-gray-200 bg-[#f8f4ea] p-6">
              <h3 className="text-xl font-black">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-700">
                {(section.items || ['Placeholder pendiente de completar.']).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
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

function buildPricingItems(tour) {
  return [
    tour.pricing?.foreignAdult && `Foreign adult: ${tour.pricing.foreignAdult}`,
    tour.pricing?.foreignChild && `Foreign child: ${tour.pricing.foreignChild}`,
    tour.pricing?.nationalAdult && `National/resident: ${tour.pricing.nationalAdult}`,
    tour.pricing?.nationalChild && `National child: ${tour.pricing.nationalChild}`,
    tour.pricing?.group && `Group: ${tour.pricing.group}`,
    tour.pricing?.private && `Private: ${tour.pricing.private}`,
    tour.pricing?.promo && `Promotion: ${tour.pricing.promo}`
  ].filter(Boolean)
}

function Itinerary({ tour }) {
  return (
    <section className="bg-[#071d14] px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">Itinerary</p>
        <h2 className="mt-4 text-4xl font-black">A clear rhythm for the day.</h2>
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
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">Gallery & Video</p>
            <h2 className="mt-4 text-4xl font-black">See the terrain before you arrive.</h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            Real visual material from Miravalles. More tour-specific video can be added as new clips are selected.
          </p>
        </div>

        {tour.video && (
          <video
            className="mb-5 h-[420px] w-full rounded-[2rem] object-cover shadow-2xl"
            src={tour.video}
            poster={tour.image}
            controls
            playsInline
          />
        )}

        <div className="grid gap-4 md:grid-cols-4">
          {(tour.gallery || [tour.image]).map((image) => (
            <div key={image} className="relative h-72 overflow-hidden rounded-[1.5rem]">
              <Image src={image} alt={tour.name} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TourFaq({ tour }) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">FAQs & Reviews</p>
        <h2 className="mt-4 text-4xl font-black">Final questions before booking.</h2>
        <div className="mt-8 space-y-4">
          {(tour.faqs || []).map((faq) => (
            <article key={faq.question} className="rounded-[1.5rem] bg-[#f8f4ea] p-6">
              <h3 className="font-black">{faq.question}</h3>
              <p className="mt-2 leading-7 text-gray-700">{faq.answer}</p>
            </article>
          ))}
          <article className="rounded-[1.5rem] border border-dashed border-gray-300 bg-white p-6">
            <h3 className="font-black">Reviews</h3>
            <p className="mt-2 leading-7 text-gray-700">
              Placeholder claro: aquí se mostrarán reseñas verificadas cuando estén disponibles. No se publican testimonios inventados.
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
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">Book Your Adventure</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight">
          Ready for {tour.shortName || tour.name}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Send a quick WhatsApp request and confirm date, group size, weather and meeting point directly with Miravalles Expedition.
        </p>
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-amber-300 px-8 py-4 font-black text-[#071d14] hover:bg-amber-200"
        >
          WhatsApp to Book
        </a>
      </div>
    </section>
  )
}
