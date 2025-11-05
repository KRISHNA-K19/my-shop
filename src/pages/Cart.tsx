import React from 'react'
import { useCartStore } from '../store/useCartStore'
import { formatINR } from '../utils/currency'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Cart() {
  const items = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const remove = useCartStore((s) => s.removeFromCart)
  const subtotal = useCartStore((s) => s.subtotal)
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded shadow text-center">
          <h3 className="font-semibold mb-2">Your cart is empty</h3>
          <Link to="/shop" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md">
            Go to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 border-b py-4">
              <img
                src={it.images?.[0] || 'https://via.placeholder.com/80'}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-500">{it.brand}</div>
                <div className="mt-2 font-semibold text-gray-700">{formatINR(it.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={it.qty}
                  min={1}
                  onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value)))}
                  className="w-16 border rounded px-2 py-1 text-center"
                />
                <button
                  onClick={() => { remove(it.id); toast('Removed from cart') }}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
          <div className="text-sm text-gray-500 mb-2">Subtotal</div>
          <div className="text-2xl font-bold text-gray-800 mb-4">{formatINR(subtotal())}</div>
          
          <button
            onClick={() => navigate('/checkout')}
            className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
