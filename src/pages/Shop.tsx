import React, { useEffect, useRef } from 'react';
import ProductGrid from '../components/ProductGrid';
import { useProductStore } from '../store/useProductStore';
import FilterBar from '../components/FilterBar';

export default function Shop() {
  const { products, fetchNext, loading, hasMore, filters, setFilters } = useProductStore();
  const sentinel = useRef<HTMLDivElement | null>(null);

  // Initial load
  useEffect(() => {
    if (products.length === 0) fetchNext();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchNext();
        }
      },
      { rootMargin: '300px' }
    );
    if (sentinel.current) obs.observe(sentinel.current);
    return () => obs.disconnect();
  }, [fetchNext, loading, hasMore]);

  const handleGender = (g?: string) => setFilters({ gender: g });
  const handleCategory = (c?: string) => setFilters({ category: c });
  const handleSearch = (s: string) => setFilters({ search: s });

  // ✅ Filter products locally for display
  const filteredProducts = products.filter((p) => {
    const matchesSearch = filters.search
      ? p.title.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchesCategory = filters.category ? p.category === filters.category : true;
    const matchesGender = filters.gender ? p.gender === filters.gender : true;
    return matchesSearch && matchesCategory && matchesGender;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterBar
        gender={filters.gender}
        category={filters.category}
        onGender={handleGender}
        onCategory={handleCategory}
        onSearch={handleSearch}
      />

      <ProductGrid products={filteredProducts} />

      <div ref={sentinel} className="h-8" />
      {loading && <div className="text-center py-6">Loading more...</div>}
      {!hasMore && !loading && <div className="text-center text-gray-500 py-4">No more products</div>}
    </div>
  );
}
