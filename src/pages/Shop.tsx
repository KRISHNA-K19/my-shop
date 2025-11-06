import React, { useEffect, useRef } from 'react'
import ProductGrid from '../components/ProductGrid'
import { useProductStore } from '../store/useProductStore'
import FilterBar from '../components/FilterBar'

export default function Shop() {
  const { products, fetchNext, loading, hasMore, filters, setFilters } = useProductStore()
  const sentinel = useRef<HTMLDivElement | null>(null)

  // ✅ Initial load
  useEffect(() => {
    if (products.length === 0) fetchNext()
  }, [])

  // ✅ Infinite Scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) fetchNext()
      },
      { rootMargin: '300px' }
    )
    if (sentinel.current) obs.observe(sentinel.current)
    return () => obs.disconnect()
  }, [fetchNext, loading, hasMore])

  // ✅ Filter handlers
  const handleGender = (g?: string) => setFilters({ gender: g })
  const handleCategory = (c?: string) => setFilters({ category: c })
  const handleSearch = (s: string) => setFilters({ search: s })

  // ✅ Local filtering logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = filters.search
      ? p.title.toLowerCase().includes(filters.search.toLowerCase())
      : true
    const matchesCategory = filters.category ? p.category === filters.category : true
    const matchesGender = filters.gender ? p.gender === filters.gender : true
    return matchesSearch && matchesCategory && matchesGender
  })

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center md:text-left">
        🛍️ Shop All Products
      </h2>

      {/* ✅ Filters */}
      <div className="mb-6">
        <FilterBar
          gender={filters.gender}
          category={filters.category}
          onGender={handleGender}
          onCategory={handleCategory}
          onSearch={handleSearch}
        />
      </div>

      {/* ✅ Product Display */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-300 mt-16">
          <p className="text-lg">No products found 😔</p>
          <p className="text-sm mt-2">Try adjusting filters or search terms.</p>
        </div>
      )}

      {/* ✅ Infinite Scroll Sentinel */}
      <div ref={sentinel} className="h-8" />

      {/* ✅ Loading & End States */}
      {loading && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 animate-pulse">
          Loading more products...
        </div>
      )}
      {!hasMore && !loading && (
        <div className="text-center text-gray-400 py-8 text-sm">
          You’ve reached the end 🎉
        </div>
      )}
    </div>
  )
}
