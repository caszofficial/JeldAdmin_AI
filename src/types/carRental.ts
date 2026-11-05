export type CarRental = {
  id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  pricePerDay: string
  minRentalDays: number
  seats: number | null
  transmission: string | null
  description: string | null
  link: string | null
  media: string[]
  createdAt: string
  updatedAt: string
}

export type CarRentalInput = {
  name: string
  address?: string
  city?: string
  country?: string
  pricePerDay: number
  minRentalDays?: number
  seats?: number
  transmission?: string
  description?: string
  link?: string
  media: string[]
}