export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  brand?: string
  rating?: number
  images?: string[]
  gender?: 'Men' | 'Women' | 'Unisex'
}
