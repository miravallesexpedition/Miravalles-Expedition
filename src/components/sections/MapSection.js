'use client'

export default function MapSection() {
  return (
    <section className="p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Ubicación</h2>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-300 flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.4896814155557!2d-85.39168342345813!3d10.747800859055846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa28e2e6f67c1f9%3A0x4e7c9f8f8f8f8f8f!2sVolc%C3%A1n%20Miravalles!5e0!3m2!1ses!2scr!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Volcán Miravalles, Guanacaste, Costa Rica</p>
          <p className="text-gray-500">📞 +506 XXXX XXXX</p>
        </div>
      </div>
    </section>
  )
}
