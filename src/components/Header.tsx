import React, { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left - Brand and Nav */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-brand">
            Tap n’ Shop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4">
            <Link to="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-accent transition-colors">
              Shop
            </Link>
            <Link to="/favorites" className="hover:text-accent transition-colors">
              Favorites
            </Link>
          </nav>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            ☰
          </button>

          {/* Cart */}
          <div className="relative group hidden sm:block">
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
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border p-4 hidden group-hover:block z-50">
                <div className="space-y-3 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
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
                    <button
                      onClick={() => navigate('/cart')}
                      className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
                    >
                      View Cart
                    </button>
                    <button
                      onClick={() => navigate('/checkout')}
                      className="px-3 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Favorites */}
          <button
            onClick={() => navigate('/favorites')}
            className="relative hidden sm:block"
          >
            ♥
            {favCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {favCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-700">{user.name}</span>
              <Link
                to="/logout"
                className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition-all"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:block px-3 py-1 border rounded text-sm hover:bg-gray-50 transition-all"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white shadow-md">
          <nav className="flex flex-col items-start gap-3 px-4 py-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)}>
              Favorites
            </Link>
            <button
              onClick={() => {
                navigate('/cart')
                setMenuOpen(false)
              }}
            >
              View Cart ({items.length})
            </button>
            {user ? (
              <Link to="/logout" onClick={() => setMenuOpen(false)}>
                Logout
              </Link>
            ) : (
              <Link to="/auth" onClick={() => setMenuOpen(false)}>
                Login / Signup
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
