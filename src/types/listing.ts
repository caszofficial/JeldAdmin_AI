export type Listing = {
  id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  forSale: boolean
  forRent: boolean
  salePrice: string | null
  rentPrice: string | null
  bedrooms: number
  bathrooms: number
  sizeSqm: string | null
  description: string | null
  link: string | null
  media: string[]
  createdAt: string
  updatedAt: string
}

export type ListingInput = {
  name: string
  address?: string
  city?: string
  country?: string
  forSale: boolean
  forRent: boolean
  salePrice?: number
  rentPrice?: number
  bedrooms: number
  bathrooms: number
  sizeSqm?: number
  description?: string
  link?: string
  media: string[]
}
