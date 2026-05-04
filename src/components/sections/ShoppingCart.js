'use client'

import { useState } from 'react'

export default function ShoppingCart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace('$', ''))
    return sum + price
  }, 0)

  if (!cart.length) return null

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs z-40">
      <h3 className="font-bold mb-3">Carrito ({cart.length})</h3>
      <div className="max-h-48 overflow-y-auto space-y-2 mb-3">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-2 bg-gray-100 rounded">
            <div>
              <p className="font-semibold text-sm">{item.name}</p>
              <p className="text-gray-600 text-xs">{item.price}</p>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="text-red-600 hover:text-red-800 text-xl"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="border-t pt-2 mb-3">
        <p className="font-bold text-lg">Total: ${total}</p>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Proceder a Pago
      </button>
    </div>
  )
}
