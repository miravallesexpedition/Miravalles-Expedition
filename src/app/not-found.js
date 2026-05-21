import Link from 'next/link'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

export const metadata = {
  title: 'Página no encontrada',
  robots: {
    index: false,
    follow: false
  }
}

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#061b13] px-4 py-16 text-white">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
          Miravalles Expedition
        </p>
        <h1 className="mt-5 text-balance text-5xl font-black leading-tight sm:text-6xl">
          Esta ruta no está disponible.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
          Puede que el enlace haya cambiado. Podés volver a los tours o escribirnos para confirmar la aventura que querés reservar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#tours"
            className="rounded-full bg-amber-300 px-7 py-4 font-black text-[#071d14] hover:bg-amber-200"
          >
            Ver tours
          </Link>
          <a
            href={buildWhatsAppUrl('Hola, necesito ayuda para encontrar un tour en Miravalles Expedition.')}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 px-7 py-4 font-black text-white hover:bg-white/10"
          >
            WhatsApp {contact.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  )
}
