'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import AboutSection from '@/components/sections/AboutSection'
import FloatingWhatsApp from '@/components/sections/FloatingWhatsApp'
import HeroSection from '@/components/sections/HeroSection'
import SiteHeader from '@/components/sections/SiteHeader'
import ToursSection from '@/components/sections/ToursSection'
import { buildMailtoUrl, buildWhatsAppUrl, contact, tours as fallbackTours } from '@/lib/siteConfig'

const ContactForm = dynamic(() => import('@/components/sections/ContactForm'), { ssr: false, loading: () => null })
const DatePicker = dynamic(() => import('@/components/sections/DatePicker'), { ssr: false, loading: () => null })
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), { loading: () => null })
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), { loading: () => null })
const GuidesSection = dynamic(() => import('@/components/sections/GuidesSection'), { loading: () => null })
const MapSection = dynamic(() => import('@/components/sections/MapSection'), { loading: () => null })
const PaymentSection = dynamic(() => import('@/components/sections/PaymentSection'), { ssr: false, loading: () => null })
const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), { loading: () => null })
const SecurePaymentSection = dynamic(() => import('@/components/sections/SecurePaymentSection'), { loading: () => null })
const ShoppingCart = dynamic(() => import('@/components/sections/ShoppingCart'), { ssr: false, loading: () => null })
const SocialSection = dynamic(() => import('@/components/sections/SocialSection'), { loading: () => null })
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { loading: () => null })
const TourInfoSection = dynamic(() => import('@/components/sections/TourInfoSection'), { loading: () => null })

export default function Home() {
  const [selectedTour, setSelectedTour] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [tours, setTours] = useState(fallbackTours)
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState({ level: '', maxPrice: 200 })

  useEffect(() => {
    let ignore = false

    async function loadTours() {
      try {
        const response = await fetch('/api/tours')
        const payload = await response.json()

        if (!ignore && response.ok && Array.isArray(payload.data) && payload.data.length) {
          setTours(payload.data)
        }
      } catch (error) {
        console.error('Error cargando tours:', error)
      }
    }

    loadTours()
    return () => {
      ignore = true
    }
  }, [])

  const handleSelectTour = (tour) => {
    setSelectedTour(tour)
    setShowDatePicker(true)
  }

  const handleDateSelect = (date) => {
    if (selectedTour) {
      setCart([...cart, { ...selectedTour, selectedDate: date }])
      setShowDatePicker(false)
      track('tour_date_selected', { tour: selectedTour.name })
    }
  }

  const handleContactSubmit = (formData) => {
    const message = [
      'Hola, quiero más información sobre Miravalles Expedition.',
      `Nombre: ${formData.name}`,
      `Correo: ${formData.email}`,
      `Teléfono: ${formData.phone}`,
      `Mensaje: ${formData.message || 'Sin mensaje adicional'}`
    ].join('\n')

    track('contact_form_submit')
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
    window.location.href = buildMailtoUrl('Consulta desde miravallesexpedition.com', message)
    setShowContactForm(false)
  }

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  return (
    <main id="contenido-principal" className="bg-[#f8f4ea]">
      <SiteHeader onReserve={() => setShowContactForm(true)} />

      <HeroSection
        onViewTours={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
        onReserve={() => setShowContactForm(true)}
      />

      <AboutSection />

      <section id="tours">
        <ToursSection
          tours={tours}
          onSelectTour={handleSelectTour}
          filters={filters}
          onFilterChange={(type, value) => setFilters({ ...filters, [type]: value })}
        />
      </section>

      <TourInfoSection />
      <PricingSection />
      <GuidesSection />
      <GallerySection variant="preview" />
      <SocialSection />
      <TestimonialsSection />

      <section id="book" className="bg-[#f8f4ea] px-4 py-20 text-center sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#071d14] p-8 text-white shadow-2xl sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
            Reservá tu aventura
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight sm:text-5xl">
            Una reserva profesional que sigue sintiéndose personal.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Step number="01" title="Elegí tu tour" text="Revisá detalles, dificultad, duración y precio." />
            <Step number="02" title="Seleccioná fecha" text="Enviá la solicitud con personas, horario y notas." />
            <Step number="03" title="Confirmamos juntos" text="Coordinamos punto de encuentro, clima y detalles finales." />
          </div>
          <button
            onClick={() => setShowContactForm(true)}
            className="mt-10 rounded-full bg-amber-300 px-8 py-4 font-black text-[#071d14] transition hover:bg-amber-200"
          >
            Consultar disponibilidad
          </button>
        </div>
      </section>

      <SecurePaymentSection />
      <MapSection />
      <FAQSection />

      <section className="bg-[#04120d] px-4 py-20 text-center text-white sm:px-6 lg:px-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-200">
          Miravalles Expedition
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black leading-tight sm:text-5xl">
          ¿Listo para descubrir el lado escondido de Guanacaste?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          Reservá una caminata, ruta de aves y naturaleza, plan de aguas termales o una consulta especial con guía local.
        </p>
        <button
          onClick={() => setShowContactForm(true)}
          className="mt-8 rounded-full bg-white px-8 py-4 text-lg font-black text-[#071d14] hover:bg-amber-100"
        >
          Reservar aventura
        </button>
      </section>

      <footer className="bg-[#020806] p-8 text-center text-sm text-white/70">
        <p className="font-bold text-white">© 2026 Miravalles Expedition</p>
        <p className="mt-2">{contact.phoneDisplay} | {contact.email}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {['Instagram', 'Facebook', 'TikTok', 'WhatsApp'].map((label) => (
            <a key={label} href="#redes" className="rounded-full border border-white/10 px-4 py-2 font-bold text-white/80 hover:bg-white/10">
              {label}
            </a>
          ))}
        </div>
      </footer>

      <FloatingWhatsApp onReserve={() => setShowContactForm(true)} />

      {showDatePicker && (
        <DatePicker
          selectedTour={selectedTour}
          onDateSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {showContactForm && (
        <ContactForm
          onSubmit={handleContactSubmit}
          onClose={() => setShowContactForm(false)}
        />
      )}

      {showPayment && (
        <PaymentSection
          cart={cart}
          onClose={() => setShowPayment(false)}
        />
      )}

      <ShoppingCart
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={() => setShowPayment(true)}
      />
    </main>
  )
}

function Step({ number, title, text }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 text-left">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">{number}</p>
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
    </article>
  )
}
