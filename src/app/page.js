'use client'

import { useEffect, useState } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import ToursSection from '@/components/sections/ToursSection'
import DatePicker from '@/components/sections/DatePicker'
import ContactForm from '@/components/sections/ContactForm'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import MapSection from '@/components/sections/MapSection'
import ShoppingCart from '@/components/sections/ShoppingCart'
import FAQSection from '@/components/sections/FAQSection'
import PaymentSection from '@/components/sections/PaymentSection'

const fallbackTours = [
  {
    id: '1',
    name: 'Volcán Miravalles',
    price: 65,
    priceLabel: '$65',
    level: 'Fácil',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300',
    description: 'Explora el majestuoso volcán con vistas panorámicas'
  },
  {
    id: '2',
    name: 'Cataratas Escondidas',
    price: 75,
    priceLabel: '$75',
    level: 'Moderado',
    image: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?w=400&h=300',
    description: 'Camina entre cascadas de agua cristalina'
  },
  {
    id: '3',
    name: 'Aguas Termales',
    price: 55,
    priceLabel: '$55',
    level: 'Relajado',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300',
    description: 'Relájate en piscinas naturales de agua caliente'
  }
]

export default function Home() {
  const [selectedTour, setSelectedTour] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [tours, setTours] = useState(fallbackTours)
  const [cart, setCart] = useState([])
  const [filters, setFilters] = useState({ level: '', maxPrice: 100 })

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
      alert(`${selectedTour.name} agregado al carrito para el ${date.toLocaleDateString()}`)
    }
  }

  const handleContactSubmit = (formData) => {
    console.log('Formulario enviado:', formData)
    alert('¡Gracias! Te contactaremos pronto.')
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

      <section id="tours">
        <ToursSection
          tours={tours}
          onSelectTour={handleSelectTour}
          filters={filters}
          onFilterChange={(type, value) => setFilters({ ...filters, [type]: value })}
        />
      </section>

      <section className="bg-gray-100 p-10 text-center">
        <h2 className="text-2xl font-bold mb-6">¿Cómo funciona?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4">
            <div className="text-4xl mb-2">1</div>
            <p className="font-semibold">Elegís tu tour</p>
            <p className="text-gray-600 text-sm">Explora todas nuestras opciones</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">2</div>
            <p className="font-semibold">Seleccionás fecha</p>
            <p className="text-gray-600 text-sm">Elige el día que mejor te convenga</p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">3</div>
            <p className="font-semibold">Confirmás y pagás</p>
            <p className="text-gray-600 text-sm">Recibirás el enlace de confirmación por email</p>
          </div>
        </div>
      </section>

      <GallerySection />
      <TestimonialsSection />
      <MapSection />
      <FAQSection />

      <section className="p-10 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para vivir la aventura?
        </h2>
        <button
          onClick={() => setShowContactForm(true)}
          className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 text-lg"
        >
          Reservar Ahora
        </button>
      </section>

      <footer className="text-center p-8 text-sm text-gray-500 bg-gray-900 text-white">
        <p>© 2026 Miravalles Expedition - Aventura Segura y Profesional</p>
        <p className="mt-2">+506 XXXX XXXX | info@miravalesexpedition.com</p>
      </footer>

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
