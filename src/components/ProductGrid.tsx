import React from 'react'
import ProductCard from './ProductCard'
import type { Product } from '../types/product'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  if (!products.length)
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 mt-12 text-base sm:text-lg">
        No products found. Try adjusting filters or search.
      </p>
    )

  return (
    <div
      className="
        grid 
        grid-cols-1                /* 1 per row on mobile */
        sm:grid-cols-2             /* 2 per row on tablets */
        md:grid-cols-3             /* 3 per row on medium screens */
        xl:grid-cols-4             /* 4 per row on large desktops */
        gap-5 sm:gap-6 md:gap-8    /* adaptive spacing */
        px-2 sm:px-0
      "
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
