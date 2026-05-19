export default function TestimonialsSection() {
  const trustItems = [
    {
      title: 'Guía local',
      text: 'Acompañamiento de gente de la zona que conoce los senderos, el clima y los mejores puntos para disfrutar con seguridad.'
    },
    {
      title: 'Grupos pequeños',
      text: 'La experiencia se siente más personal, con tiempo para fotos, descansos y conexión real con la naturaleza.'
    },
    {
      title: 'Precios claros',
      text: 'El visitante sabe qué incluye, qué no incluye y cuánto cuesta antes de reservar.'
    },
    {
      title: 'Naturaleza auténtica',
      text: 'Cataratas, aves, flores, ríos y paisaje volcánico fuera de las rutas turísticas más masivas.'
    }
  ]

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            Confianza
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 sm:text-4xl">
            Una experiencia seria, local y auténtica
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.title} className="rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-gray-950">{item.title}</h3>
              <p className="text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
