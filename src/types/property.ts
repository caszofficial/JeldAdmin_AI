export type Property = {
  id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  price: string
  rating: string | null
  minStayDays: number
  bedrooms: number
  bathrooms: number
  sizeSqm: string | null
  description: string | null
  link: string | null
  media: string[]
  createdAt: string
  updatedAt: string
}

export type PropertyInput = {
  name: string
  address?: string
  city?: string
  country?: string
  price: number
  rating?: number
  minStayDays: number
  bedrooms: number
  bathrooms: number
  sizeSqm?: number
  description?: string
  link?: string
  media: string[]
}
