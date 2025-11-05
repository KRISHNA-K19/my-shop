import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useAuthStore } from '../store/useAuthStore'
import { formatINR } from '../utils/currency'

export default function Header() {
  const { items, subtotal } = useCartStore((s) => ({ items: s.items, subtotal: s.subtotal }))
  const favCount = useFavoritesStore((s) => s.ids.length)
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-brand">Tap n’ Shop</Link>
          <nav className="hidden md:flex gap-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <Link to="/shop" className="hover:text-accent">Shop</Link>
            <Link to="/favorites" className="hover:text-accent">Favorites</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="px-3 py-1 border rounded hover:bg-gray-50 transition-all flex items-center">
              🛒 Cart
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-accent text-white text-xs px-2 rounded-full">
                  {items.length}
                </span>
              )}
            </button>
            
            {/* Mini cart dropdown */}
            {items.length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 hidden group-hover:block z-50">
                <div className="space-y-3 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.images?.[0]} alt={item.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs text-gray-500">Qty: {item.qty}</div>
                      </div>
                      <div className="text-sm font-semibold">{formatINR(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t">
                  <div className="flex justify-between text-sm mb-3">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatINR(subtotal())}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => navigate('/cart')} className="px-3 py-2 text-sm border rounded hover:bg-gray-50">
                      View Cart
                    </button>
                    <button onClick={() => navigate('/checkout')} className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => navigate('/favorites')} className="relative">
            ♥
            {favCount > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">{favCount}</span>}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span>{user.name}</span>
              <Link to="/logout" className="px-3 py-1 border rounded text-sm">Logout</Link>
            </div>
          ) : (
            <Link to="/auth" className="px-3 py-1 border rounded text-sm">Login / Signup</Link>
          )}
        </div>
      </div>
    </header>
  )
}
