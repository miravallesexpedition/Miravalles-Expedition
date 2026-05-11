import Link from 'next/link'

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">Pago completado</h1>
        <p className="mb-6 text-gray-700">Gracias. Tu reserva quedó pagada correctamente.</p>
        <Link href="/" className="font-semibold text-green-700 hover:text-green-800">
          Volver al inicio
        </Link>
      </section>
    </main>
  )
}
