'use client'

import { track } from '@vercel/analytics'
import { buildWhatsAppUrl, contact } from '@/lib/siteConfig'

const trustSignals = [
  {
    title: 'No guardamos tarjetas',
    text: 'Los pagos en USD se procesan fuera de nuestro sitio mediante PayPal. Miravalles Expedition no almacena números de tarjeta.'
  },
  {
    title: 'Reserva antes de pagar',
    text: 'Primero enviás una solicitud. Confirmamos fecha, clima, punto de encuentro y disponibilidad antes de continuar al pago.'
  },
  {
    title: 'Total visible',
    text: 'Antes de pagar ves el tour, la fecha, la cantidad de personas, la moneda y el total estimado de la reserva.'
  },
  {
    title: 'Contacto humano',
    text: `Cualquier duda se confirma por WhatsApp con el número oficial ${contact.phoneDisplay}.`
  }
]

const flowSteps = [
  {
    number: '01',
    title: 'Solicitás la reserva',
    text: 'Elegís tour, fecha, cantidad de personas y tipo de tarifa.'
  },
  {
    number: '02',
    title: 'Confirmamos detalles',
    text: 'Revisamos disponibilidad, clima, ruta y punto de encuentro.'
  },
  {
    number: '03',
    title: 'Pagás con enlace seguro',
    text: 'Si pagás en USD, continuás a PayPal. Si sos nacional o residente, coordinamos CRC por WhatsApp.'
  },
  {
    number: '04',
    title: 'Queda todo claro',
    text: 'Recibís confirmación y podés consultar cualquier detalle antes del tour.'
  }
]

export default function SecurePaymentSection() {
  const handleWhatsApp = () => {
    track('secure_payment_whatsapp_click')
    window.open(
      buildWhatsAppUrl('Hola, quiero consultar cómo funciona el pago seguro de Miravalles Expedition.'),
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleTours = () => {
    track('secure_payment_tours_click')
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="pago-seguro" className="bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-green-800">
              Pago seguro
            </p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight text-[#11130f] sm:text-5xl">
              Reservá con claridad, pagá con confianza.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              La reserva está diseñada para sentirse segura desde el primer clic: comunicación directa, precio visible, confirmación humana y pago procesado por plataformas confiables.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-green-900/10 bg-[#f8f4ea] p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Lo importante
              </p>
              <p className="mt-3 text-xl font-black leading-8 text-[#071d14]">
                Para pagos internacionales usamos PayPal. Para tarifas nacionales en colones, coordinamos el método directamente por WhatsApp antes de confirmar.
              </p>
              <p className="mt-4 text-sm leading-7 text-gray-700">
                Nunca te pedimos datos sensibles de tarjeta por WhatsApp, correo o formulario. Si pagás en línea, verificá que la página de pago sea de PayPal antes de completar la transacción.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleTours}
                className="rounded-full bg-[#071d14] px-7 py-4 font-black text-white transition hover:bg-green-900"
              >
                Ver tours
              </button>
              <button
                onClick={handleWhatsApp}
                className="rounded-full border border-[#071d14] px-7 py-4 font-black text-[#071d14] transition hover:bg-[#071d14] hover:text-white"
              >
                Consultar por WhatsApp
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustSignals.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-green-800">{item.title}</p>
                <p className="mt-4 text-sm leading-7 text-gray-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] bg-[#071d14] p-6 text-white shadow-2xl sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-200">
                Flujo de reserva
              </p>
              <h3 className="mt-3 text-3xl font-black">Simple, verificable y acompañado.</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/70">
              El cliente no queda solo frente a un checkout frío: primero entiende la experiencia, luego confirma y después paga.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {flowSteps.map((step) => (
              <article key={step.number} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">{step.number}</p>
                <h4 className="mt-4 text-lg font-black">{step.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/70">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
