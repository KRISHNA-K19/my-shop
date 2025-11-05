import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types/product'

export type CartItem = Product & { qty: number }

type CartState = {
  items: CartItem[]
  addToCart: (product: Product, qty?: number) => void
  removeFromCart: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  subtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, qty = 1) => {
        const items = get().items
        const found = items.find((i) => i.id === product.id)
        if (found) {
          set({ items: items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i)) })
        } else {
          set({ items: [...items, { ...product, qty }] })
        }
      },
      removeFromCart: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQty: (id, qty) => set({ items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)) }),
      clearCart: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0)
    }),
    { name: 'cart-storage' }
  )
)
