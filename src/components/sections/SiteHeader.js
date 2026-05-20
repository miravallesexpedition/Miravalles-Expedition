'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, contact, tourImages } from '@/lib/siteConfig'

const navItems = [
  { label: 'Tours', href: '/#tours' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Guides', href: '/#guides' },
  { label: 'FAQ', href: '/#faq' }
]

export default function SiteHeader({ onReserve }) {
  const [open, setOpen] = useState(false)

  const handleWhatsApp = () => {
    track('header_whatsapp_click')
    window.open(
      buildWhatsAppUrl('Hola, quiero reservar una experiencia con Miravalles Expedition.'),
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061b13]/80 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Miravalles Expedition home">
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

        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-200">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={handleWhatsApp}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white/10"
          >
            WhatsApp
          </button>
          <button
            onClick={onReserve}
            className="rounded-full bg-amber-300 px-5 py-2 text-sm font-bold text-[#071d14] transition hover:bg-amber-200"
          >
            Book Adventure
          </button>
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold lg:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#061b13] px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/5 px-4 py-3 font-semibold text-white"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onReserve()
              }}
              className="rounded-lg bg-amber-300 px-4 py-3 font-bold text-[#071d14]"
            >
              Book Adventure
            </button>
            <button
              onClick={handleWhatsApp}
              className="rounded-lg border border-white/20 px-4 py-3 font-bold text-white"
            >
              WhatsApp {contact.phoneDisplay}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
