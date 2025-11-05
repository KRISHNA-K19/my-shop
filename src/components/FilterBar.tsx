import React from 'react';
import { useProductStore } from '../store/useProductStore';

interface Props {
  gender?: string;
  category?: string;
  onGender: (g?: string) => void;
  onCategory: (c?: string) => void;
  onSearch: (s: string) => void;
}

const FilterBar: React.FC<Props> = ({ gender, category, onGender, onCategory, onSearch }) => {
  const products = useProductStore((s) => s.products);

  // Generate unique categories and genders from loaded products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const genders = Array.from(new Set(products.map((p) => p.gender).filter(Boolean))) as string[];

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-4">
      <div className="flex gap-3">
        <select
          value={gender ?? ''}
          onChange={(e) => onGender(e.target.value || undefined)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All genders</option>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={category ?? ''}
          onChange={(e) => onCategory(e.target.value || undefined)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search products..."
          className="px-3 py-2 border rounded w-64"
        />
      </div>
    </div>
  );
};

export default FilterBar;
