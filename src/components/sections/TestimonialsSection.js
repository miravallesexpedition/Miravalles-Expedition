const trustItems = [
  {
    title: 'Guided by locals',
    text: 'The route, pace and recommendations come from people who understand the area, weather and trail conditions.'
  },
  {
    title: 'Small groups',
    text: 'A quieter, more personal experience with time for photos, water breaks and real connection with nature.'
  },
  {
    title: 'Clear expectations',
    text: 'Difficulty, duration, what to bring and what is not included are communicated before confirming.'
  },
  {
    title: 'Review-ready',
    text: 'The review area is prepared for verified customer feedback as soon as real reviews are collected.'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Why Choose Us
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
              Trust before booking.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-700">
            This section avoids fake testimonials. It builds confidence with clear operating promises now, and is ready for verified traveler reviews later.
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
