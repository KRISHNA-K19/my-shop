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
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Your cart is empty 🛒
          </h3>
          <Link
            to="/shop"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-all"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white text-center">
        Your Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🛍️ Cart Items */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-gray-200 dark:border-gray-700 py-4 last:border-none"
            >
              <img
                src={it.images?.[0] || 'https://via.placeholder.com/80'}
                alt={it.title}
                className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg"
              />

              <div className="flex-1 text-center sm:text-left">
                <div className="font-medium text-gray-900 dark:text-white">{it.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{it.brand}</div>
                <div className="mt-2 font-semibold text-indigo-600 dark:text-indigo-400">
                  {formatINR(it.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={it.qty}
                  min={1}
                  onChange={(e) =>
                    updateQty(it.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-center dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => {
                    remove(it.id)
                    toast('Removed from cart 🗑️')
                  }}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 💳 Summary */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-fit">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Order Summary
          </h4>

          <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-6">
            <span>Subtotal</span>
            <span className="font-semibold">{formatINR(subtotal())}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/shop"
            className="block text-center text-indigo-600 dark:text-indigo-400 mt-4 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
