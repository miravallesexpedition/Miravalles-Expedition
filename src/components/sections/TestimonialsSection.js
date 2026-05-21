const trustItems = [
  {
    title: 'Guiado por locales',
    text: 'La ruta, el ritmo y las recomendaciones vienen de personas que entienden la zona, el clima y el sendero.'
  },
  {
    title: 'Grupos pequeños',
    text: 'Una experiencia más tranquila y personal, con tiempo para fotos, pausas de agua y conexión real con la naturaleza.'
  },
  {
    title: 'Expectativas claras',
    text: 'La dificultad, duración, qué llevar y qué no incluye se comunican antes de confirmar.'
  },
  {
    title: 'Reseñas reales',
    text: 'La sección de reseñas queda preparada para mostrar opiniones verificadas cuando estén disponibles.'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Por qué elegirnos
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
              Confianza antes de reservar.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            Esta sección evita testimonios inventados. Construye confianza con promesas claras de operación y queda lista para reseñas verificadas de viajeros reales.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <article key={item.title} className="rounded-[1.5rem] border border-gray-200 bg-[#f8f4ea] p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">0{index + 1}</p>
              <h3 className="mt-4 text-xl font-black text-[#11130f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-700">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
