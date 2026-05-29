import Image from 'next/image'
import Link from 'next/link'
import GallerySection from '@/components/sections/GallerySection'
import { buildWhatsAppUrl, contact, galleryImages, tourImages } from '@/lib/siteConfig'

const siteUrl = 'https://miravallesexpedition.com'
const galleryWhatsAppUrl = buildWhatsAppUrl('Hola, vi la galería de Miravalles Expedition y quiero consultar disponibilidad.')
const galleryStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Galería Miravalles Expedition',
  url: `${siteUrl}/galeria`,
  description:
    'Fotos propias de Miravalles Expedition: cataratas escondidas, Termales El Guayacán, Volcán Miravalles, aves, flora y naturaleza de Guanacaste.',
  image: galleryImages.map((image) => `${siteUrl}${image.url}`),
  associatedMedia: galleryImages.map((image) => ({
    '@type': 'ImageObject',
    contentUrl: `${siteUrl}${image.url}`,
    name: image.caption,
    description: image.alt
  }))
}

export const metadata = {
  title: 'Galería completa',
  description:
    'Fotos propias de Miravalles Expedition: cataratas escondidas, Termales El Guayacán, Volcán Miravalles, aves, flora y naturaleza de Guanacaste.',
  alternates: {
    canonical: '/galeria'
  },
  openGraph: {
    title: 'Galería completa | Miravalles Expedition',
    description:
      'Explorá el material visual propio de Miravalles Expedition: cataratas, termales, volcán, aves y naturaleza local.',
    images: galleryImages.slice(0, 3).map((image) => ({
      url: image.url,
      alt: image.alt
    }))
  }
}

export default function GalleryPage() {
  return (
    <main id="contenido-principal" className="bg-[#071d14] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }}
      />

      <header className="border-b border-white/10 bg-[#061b13]">
        <div className="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Volver al inicio">
            <Image
              src={tourImages.logo}
              alt="Miravalles Expedition"
              width={48}
              height={48}
              className="h-12 w-12 rounded bg-white object-contain p-1"
              priority
            />
            <div className="leading-tight">
              <p className="text-sm font-bold uppercase tracking-[0.26em]">Miravalles</p>
              <p className="text-xs uppercase tracking-[0.42em] text-amber-200">Expedition</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-black">
            <Link href="/#tours" className="rounded-full border border-white/15 px-4 py-2 text-white/85 hover:bg-white/10">
              Tours
            </Link>
            <Link href="/#book" className="rounded-full bg-amber-300 px-4 py-2 text-[#071d14] hover:bg-amber-200">
              Reservar
            </Link>
            <a href={galleryWhatsAppUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-white/85 hover:bg-white/10">
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
        <Image
          src={tourImages.hero}
          alt="Catarata escondida de Miravalles"
          fill
          priority
          sizes="100vw"
          quality={78}
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061b13]/80 via-[#061b13]/70 to-[#071d14]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
            Galería completa
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[0.95] sm:text-7xl">
            Cataratas, termales, volcán y vida silvestre de Miravalles.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Este espacio reúne material visual propio de Miravalles Expedition. Podés abrir cada imagen, verla en grande y explorar con calma antes de reservar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#tours" className="rounded-full bg-amber-300 px-6 py-3 font-black text-[#071d14] hover:bg-amber-200">
              Ver tours
            </Link>
            <a href={galleryWhatsAppUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 font-black text-white hover:bg-white/10">
              Consultar disponibilidad
            </a>
          </div>
        </div>
      </section>

      <GallerySection variant="full" />

      <footer className="bg-[#020806] p-8 text-center text-sm text-white/70">
        <p className="font-bold text-white">Miravalles Expedition</p>
        <p className="mt-2">{contact.phoneDisplay} | {contact.email}</p>
        <Link href="/" className="mt-4 inline-flex rounded-full border border-white/10 px-5 py-2 font-bold text-white/80 hover:bg-white/10">
          Volver al inicio
        </Link>
      </footer>
    </main>
  )
}
