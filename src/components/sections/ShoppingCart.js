'use client'

export default function ShoppingCart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + getTourPrice(item), 0)

  if (!cart.length) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 rounded-[1.5rem] border border-black/10 bg-white p-4 shadow-2xl sm:left-auto sm:right-6 sm:max-w-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-black text-[#11130f]">Solicitud de reserva ({cart.length})</h3>
        <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">Borrador</p>
      </div>
      <div className="mb-3 max-h-48 space-y-2 overflow-y-auto">
        {cart.map((item, i) => (
          <div key={`${item.id || item.name}-${i}`} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f8f4ea] p-3">
            <div>
              <p className="text-sm font-black">{item.name}</p>
              <p className="text-xs text-gray-600">{item.priceLabel || `$${getTourPrice(item)}`} p.p.</p>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-50 font-black text-red-700 hover:bg-red-100"
              aria-label={`Quitar ${item.name}`}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="mb-3 border-t border-gray-100 pt-3">
        <p className="text-lg font-black">Base extranjero: ${total}</p>
        <p className="text-xs text-gray-500">La tarifa nacional/residente se selecciona en el formulario. Transporte no incluido.</p>
      </div>
      <button
        onClick={onCheckout}
        className="w-full rounded-full bg-[#071d14] py-3 font-black text-white hover:bg-green-900"
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
