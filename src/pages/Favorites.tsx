import React from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { useProductStore } from '../store/useProductStore'
import ProductGrid from '../components/ProductGrid'

export default function Favorites() {
  const favIds = useFavoritesStore((s) => s.ids)
  const products = useProductStore((s) => s.products)

  const favProducts = products.filter((p) => favIds.includes(p.id))

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-4">Favorites</h3>
      {favProducts.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">No favourites yet.</div>
      ) : (
        <ProductGrid products={favProducts} />
      )}
    </div>
  )
}
