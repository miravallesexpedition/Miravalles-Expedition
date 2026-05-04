'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: '¿Cuál es la edad mínima para los tours?',
      answer: 'La edad mínima es de 5 años para tours de relajación y 10 años para tours de aventura moderada. Los menores deben ir acompañados de un adulto.'
    },
    {
      question: '¿Qué incluye el tour?',
      answer: 'Cada tour incluye transporte, guía profesional, equipo de seguridad y almuerzo. Algunas opciones incluyen entrada a parques naturales.'
    },
    {
      question: '¿Hay descuentos para grupos?',
      answer: 'Sí! Ofrecemos descuentos especiales para grupos de 10 o más personas. Contáctanos para más información.'
    },
    {
      question: '¿Qué pasa si llueve?',
      answer: 'Los tours se realizan lluvia o sol. Proporcionamos ponchos impermeables. En caso de peligro extremo, ofrecemos reembolso o cambio de fecha.'
    },
    {
      question: '¿Puedo cancelar mi reserva?',
      answer: 'Sí, con 48 horas de anticipación recibirás reembolso completo. Cancelaciones con menos tiempo tendrán una penalidad del 20%.'
    },
    {
      question: '¿Qué debo llevar?',
      answer: 'Recomendamos: ropa cómoda, zapatos cerrados, protector solar, agua, cámara y documentos de identidad.'
    }
  ]

  return (
    <section className="p-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="w-full p-4 bg-white hover:bg-gray-100 text-left font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span className="text-xl">{openFAQ === i ? '−' : '+'}</span>
            </button>
            {openFAQ === i && (
              <div className="p-4 bg-gray-100 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
