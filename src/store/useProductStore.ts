import create from 'zustand';
import axios from 'axios';
import type { Product } from '../types/product';

type ProductState = {
  products: Product[];
  loading: boolean;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: { gender?: string; category?: string; search?: string };
  addProducts: (p: Product[]) => void;
  reset: () => void;
  fetchNext: () => Promise<void>;
  setFilters: (f: Partial<ProductState['filters']>) => void;
  filteredProducts: Product[];
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  total: 0,
  page: 0,
  limit: 20,
  hasMore: true,
  filters: {},
  addProducts: (p) => set((s) => ({ products: [...s.products, ...p] })),
  reset: () => set({ products: [], page: 0, hasMore: true }),
  setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
  fetchNext: async () => {
    const s = get();
    if (s.loading || !s.hasMore) return;
    set({ loading: true });
    try {
      const skip = s.page * s.limit;
      const res = await axios.get(`https://dummyjson.com/products?limit=${s.limit}&skip=${skip}`);
      const data = res.data;

      const items: Product[] = data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: Math.round(p.price),
        category: p.category,
        brand: p.brand,
        rating: p.rating,
        images: p.images,
        gender: p.category.toLowerCase().includes('women')
          ? 'Women'
          : p.category.toLowerCase().includes('men')
          ? 'Men'
          : 'Unisex'
      }));

      set({
        products: [...s.products, ...items],
        page: s.page + 1,
        total: data.total,
        hasMore: skip + s.limit < data.total
      });
    } catch (err) {
      console.error('fetch products error', err);
    } finally {
      set({ loading: false });
    }
  },
  get filteredProducts() {
    const { products, filters } = get();
    return products.filter((p) => {
      const matchesSearch = filters.search
        ? p.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const matchesCategory = filters.category ? p.category === filters.category : true;
      const matchesGender = filters.gender ? p.gender === filters.gender : true;
      return matchesSearch && matchesCategory && matchesGender;
    });
  }
}));
