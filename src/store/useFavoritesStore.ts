import create from 'zustand'
import { persist } from 'zustand/middleware'

type FavoritesState = {
  ids: number[]
  toggle: (id: number) => void
  add: (id: number) => void
  remove: (id: number) => void
  isFav: (id: number) => boolean
  clear: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id: number) => {
        const ids = get().ids
        if (!ids.includes(id)) set({ ids: [...ids, id] })
      },
      remove: (id: number) => {
        set({ ids: get().ids.filter((x) => x !== id) })
      },
      toggle: (id: number) => {
        const ids = get().ids
        if (ids.includes(id)) get().remove(id)
        else get().add(id)
      },
      isFav: (id: number) => get().ids.includes(id),
      clear: () => set({ ids: [] })
    }),
    { name: 'fav-storage' }
  )
)
