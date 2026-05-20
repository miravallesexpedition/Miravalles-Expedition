'use client'

import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import AboutSection from '@/components/sections/AboutSection'
import ContactForm from '@/components/sections/ContactForm'
import DatePicker from '@/components/sections/DatePicker'
import FAQSection from '@/components/sections/FAQSection'
import FloatingWhatsApp from '@/components/sections/FloatingWhatsApp'
import GallerySection from '@/components/sections/GallerySection'
import HeroSection from '@/components/sections/HeroSection'
import MapSection from '@/components/sections/MapSection'
import PaymentSection from '@/components/sections/PaymentSection'
import PricingSection from '@/components/sections/PricingSection'
import ShoppingCart from '@/components/sections/ShoppingCart'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import TourInfoSection from '@/components/sections/TourInfoSection'
import ToursSection from '@/components/sections/ToursSection'
import { buildMailtoUrl, buildWhatsAppUrl, contact, tours as fallbackTours } from '@/lib/siteConfig'

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
      alert(`${selectedTour.name} agregado a la solicitud para el ${date.toLocaleDateString()}`)
    }
  }

  const handleContactSubmit = (formData) => {
    const message = [
      'Hola, quiero más información sobre Miravalles Expedition.',
      `Nombre: ${formData.name}`,
      `Email: ${formData.email}`,
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

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0)

  return (
    <main>
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

      <PricingSection />
      <TourInfoSection />

      <section className="bg-gray-100 px-4 py-14 text-center sm:px-6 lg:px-10">
        <h2 className="mb-6 text-3xl font-bold text-gray-950">Cómo reservar</h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          <div className="p-4">
            <div className="mb-2 text-4xl font-bold text-green-700">1</div>
            <p className="font-semibold">Elegís tu tour</p>
            <p className="text-sm text-gray-600">Revisá precio, dificultad, duración y lo que incluye.</p>
          </div>
          <div className="p-4">
            <div className="mb-2 text-4xl font-bold text-green-700">2</div>
            <p className="font-semibold">Seleccionás fecha</p>
            <p className="text-sm text-gray-600">Enviás una solicitud con cantidad de personas y notas.</p>
          </div>
          <div className="p-4">
            <div className="mb-2 text-4xl font-bold text-green-700">3</div>
            <p className="font-semibold">Confirmamos detalles</p>
            <p className="text-sm text-gray-600">Te contactamos por WhatsApp o correo para coordinar punto de encuentro.</p>
          </div>
        </div>
      </section>

      <GallerySection />
      <TestimonialsSection />
      <MapSection />
      <FAQSection />

      <section className="bg-gray-950 px-4 py-14 text-center text-white sm:px-6 lg:px-10">
        <h2 className="mb-4 text-3xl font-bold">¿Listo para vivir Miravalles?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-white/75">
          Reservá una caminata, un tour de aves o una experiencia privada con guía local.
        </p>
        <button
          onClick={() => setShowContactForm(true)}
          className="rounded bg-white px-8 py-3 text-lg font-bold text-gray-950 hover:bg-amber-100"
        >
          Consultar disponibilidad
        </button>
      </section>

      <footer className="bg-gray-900 p-8 text-center text-sm text-white">
        <p>© 2026 Miravalles Expedition - Aventura segura y profesional</p>
        <p className="mt-2">{contact.phoneDisplay} | {contact.email}</p>
      </footer>

      <FloatingWhatsApp />

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
          total={totalPrice}
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
