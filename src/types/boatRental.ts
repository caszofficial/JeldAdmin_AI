export type BoatRental = {
  id: string
  name: string
  address: string | null
  city: string | null
  country: string | null
  pricePerHour: string
  minRentalHours: number
  capacity: number | null
  description: string | null
  link: string | null
  media: string[]
  createdAt: string
  updatedAt: string
}

export type BoatRentalInput = {
  name: string
  address?: string
  city?: string
  country?: string
  pricePerHour: number
  minRentalHours?: number
  capacity?: number
  description?: string
  link?: string
  media: string[]
}