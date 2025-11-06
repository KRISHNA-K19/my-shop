import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useCartStore } from '../store/useCartStore'
import { toast } from 'react-hot-toast'
import type { Product } from '../types/product'
import Lottie from 'lottie-react'
import cartAnimation from '../assets/animations/shopping-cart.json'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggle, isFav } = useFavoritesStore()
  const addToCart = useCartStore((s) => s.addToCart)
  const navigate = useNavigate()
  const [showAnimation, setShowAnimation] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentlyFav = isFav(product.id)
    toggle(product.id)
    toast(currentlyFav ? 'Removed from favorites ❤️' : 'Added to favorites 🤍')
  }

  const handleAddToCart = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
      addToCart(product, 1)
      toast.success((t) => (
        <div className="flex flex-col gap-1">
          <span>Added {product.title} to cart 🛒</span>
          <button
            onClick={() => {
              toast.dismiss(t.id)
              navigate('/cart')
            }}
            className="bg-accent text-white text-sm px-3 py-1 rounded"
          >
            View Cart & Checkout
          </button>
        </div>
      ), { duration: 4000 })
    }, 1800)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-4 group relative cursor-pointer flex flex-col">
      {/* 🖼️ Product Image */}
      <div className="relative overflow-hidden rounded-xl h-56 sm:h-64 md:h-72">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />

        {/* ❤️ Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 z-20 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition-all"
        >
          {isFav(product.id) ? (
            <span className="text-red-500 text-xl">❤️</span>
          ) : (
            <span className="text-gray-400 text-xl">🤍</span>
          )}
        </button>
      </div>

      {/* 🛍️ Product Info */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">{product.brand}</p>
        </div>

        <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2 text-base sm:text-lg">
          ₹{product.price}
        </p>
      </div>

      {/* 🪄 Hover Overlay (for larger screens) */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex flex-col justify-center items-center text-center p-4 z-10">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-lg">
          {product.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3">
          {product.description.length > 100
            ? product.description.substring(0, 100) + '...'
            : product.description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
          className="bg-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm sm:text-base"
        >
          Add to Cart
        </button>
      </div>

      {/* 🧩 Lottie Animation Overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col items-center w-full max-w-xs sm:max-w-sm">
            <Lottie animationData={cartAnimation} loop={false} autoplay style={{ width: 180, height: 180 }} />
            <p className="text-center text-green-600 dark:text-green-400 font-semibold mt-3 text-sm sm:text-base">
              Added to Cart!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard
