'use client'

export default function ShoppingCart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + getTourPrice(item), 0)

  if (!cart.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-xs rounded-lg bg-white p-4 shadow-lg">
      <h3 className="mb-3 font-bold text-gray-950">Solicitud ({cart.length})</h3>
      <div className="mb-3 max-h-48 space-y-2 overflow-y-auto">
        {cart.map((item, i) => (
          <div key={`${item.id || item.name}-${i}`} className="flex items-center justify-between gap-3 rounded bg-gray-100 p-2">
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-gray-600">{item.priceLabel || `$${getTourPrice(item)}`} p.p.</p>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="text-xl text-red-600 hover:text-red-800"
              aria-label={`Quitar ${item.name}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mb-3 border-t pt-2">
        <p className="text-lg font-bold">Base por persona: ${total}</p>
        <p className="text-xs text-gray-500">No incluye transporte.</p>
      </div>
      <button
        onClick={onCheckout}
        className="w-full rounded bg-green-700 py-2 font-semibold text-white hover:bg-green-800"
      >
        Enviar solicitud
      </button>
    </div>
  )
}

function getTourPrice(tour) {
  if (typeof tour.price === 'number') return tour.price
  return Number(String(tour.price).replace('$', ''))
}
