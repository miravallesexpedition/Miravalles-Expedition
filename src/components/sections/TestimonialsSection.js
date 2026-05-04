'use client'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      text: 'Experiencia increíble! Los guías fueron profesionales y muy amables. Volvería mil veces.',
      tour: 'Volcán Miravalles'
    },
    {
      name: 'Carlos López',
      rating: 5,
      text: 'Las aguas termales fueron la mejor parte del viaje. Muy relajante y bien organizado.',
      tour: 'Aguas Termales'
    },
    {
      name: 'Ana Martínez',
      rating: 4,
      text: 'Excelente grupo y guías conocedores. Recomendado para todos los niveles.',
      tour: 'Cataratas Escondidas'
    },
    {
      name: 'Diego Rodríguez',
      rating: 5,
      text: 'Seguridad y diversión garantizadas. Impecable la organización de todo.',
      tour: 'Volcán Miravalles'
    },
  ]

  return (
    <section className="p-10 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Reseñas de Clientes</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {Array(testimonial.rating).fill('⭐')}
              </div>
            </div>
            <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
            <div className="border-t pt-3">
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.tour}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
