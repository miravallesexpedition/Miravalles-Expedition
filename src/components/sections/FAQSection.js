'use client'

import { useState } from 'react'
import { siteFaqs } from '@/lib/siteConfig'

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(0)

  return (
    <section id="faq" className="bg-[#f8f4ea] px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[420px_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
            Preguntas frecuentes
          </p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f]">
            Preguntas que los viajeros hacen antes de reservar.
          </h2>
          <p className="mt-5 leading-8 text-gray-700">
            Las respuestas claras reducen dudas y ayudan a contactar con más confianza.
          </p>
        </div>

        <div className="space-y-3">
          {siteFaqs.map((faq, i) => (
            <div key={faq.question} className="overflow-hidden rounded-[1.25rem] border border-black/5 bg-white shadow-sm">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#11130f] hover:bg-amber-50"
              >
                <span>{faq.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#071d14] text-white">
                  {openFAQ === i ? '-' : '+'}
                </span>
              </button>
              {openFAQ === i && (
                <div className="border-t border-gray-100 bg-white p-5 leading-8 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
