import React from 'react'
import { useProductStore } from '../store/useProductStore'

interface Props {
  gender?: string
  category?: string
  onGender: (g?: string) => void
  onCategory: (c?: string) => void
  onSearch: (s: string) => void
}

const FilterBar: React.FC<Props> = ({ gender, category, onGender, onCategory, onSearch }) => {
  const products = useProductStore((s) => s.products)

  // ✅ Extract unique categories dynamically
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  // ✅ Fixed gender options for better control
  const genderOptions = ['Men', 'Women', 'Unisex']

  return (
    <div
      className="
        flex flex-col md:flex-row
        gap-4 md:gap-6 
        items-center justify-between 
        bg-white dark:bg-gray-900 
        rounded-xl p-4 md:p-5 
        shadow-sm border border-gray-200 dark:border-gray-700
        mb-6
      "
    >
      {/* Filters Group */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto justify-center md:justify-start">
        {/* Gender Filter */}
        <select
          value={gender ?? ''}
          onChange={(e) => onGender(e.target.value || undefined)}
          className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <option value="">All Genders</option>
          {genderOptions.map((g) => (
            <option key={g} value={g.toLowerCase()}>
              {g}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={category ?? ''}
          onChange={(e) => onCategory(e.target.value || undefined)}
          className="px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="w-full sm:w-auto mt-2 sm:mt-0">
        <input
          onChange={(e) => onSearch(e.target.value)}
          placeholder="🔍 Search products..."
          className="
            px-4 py-2 border rounded-md 
            w-full sm:w-64
            bg-gray-50 dark:bg-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition-all
          "
        />
      </div>
    </div>
  )
}

export default FilterBar
