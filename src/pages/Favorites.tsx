import React from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useProductStore } from '../store/useProductStore'
import ProductGrid from '../components/ProductGrid'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const favIds = useFavoritesStore((s) => s.ids)
  const products = useProductStore((s) => s.products)

  const favProducts = products.filter((p) => favIds.includes(p.id))

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
        ❤️ Your Favorites
      </h2>

      {favProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You haven’t added any favorites yet.
          </p>
          <Link
            to="/shop"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md transition-all"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={favProducts} />
      )}
    </div>
  )
}
