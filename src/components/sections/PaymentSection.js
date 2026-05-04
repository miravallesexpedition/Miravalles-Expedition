'use client'

export default function PaymentSection({ cart, total, onClose }) {
  const handlePayment = () => {
    // Integración con Stripe
    alert('Redirigiendo a Stripe para completar el pago...')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Resumen de Pago</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="space-y-3 mb-6 pb-4 border-b">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between">
              <p>{item.name}</p>
              <p className="font-semibold">{item.price}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 p-4 bg-gray-100 rounded">
          <p className="text-gray-600">Total a Pagar</p>
          <p className="text-3xl font-bold text-green-600">${total}</p>
        </div>

        <div className="space-y-2 mb-6">
          <div>
            <label className="block font-semibold mb-1">Número de Tarjeta</label>
            <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-2 border rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold mb-1">MM/AA</label>
              <input type="text" placeholder="12/25" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">CVC</label>
              <input type="text" placeholder="123" className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Pagar ${total}
        </button>
      </div>
    </div>
  )
}
