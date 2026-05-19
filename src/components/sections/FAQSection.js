'use client'

import { useState } from 'react'
import { siteFaqs } from '@/lib/siteConfig'

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null)

  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-950">Preguntas frecuentes</h2>
        {siteFaqs.map((faq, i) => (
          <div key={faq.question} className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-gray-950 hover:bg-gray-50"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openFAQ === i ? '-' : '+'}</span>
            </button>
            {openFAQ === i && (
              <div className="border-t border-gray-100 bg-gray-50 p-4 leading-6 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
