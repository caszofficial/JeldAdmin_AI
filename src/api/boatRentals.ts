import { api } from './client'
import type { BoatRental, BoatRentalInput } from '../types/boatRental'

export async function getBoatRentals() {
  const { data } = await api.get<{ boatRentals: BoatRental[] }>('/boat-rentals')
  return data.boatRentals
}

export async function getBoatRental(id: string) {
  const { data } = await api.get<{ boatRental: BoatRental }>(`/boat-rentals/${id}`)
  return data.boatRental
}

export async function createBoatRental(input: BoatRentalInput) {
  const { data } = await api.post<{ boatRental: BoatRental }>('/boat-rentals', input)
  return data.boatRental
}

export async function updateBoatRental(id: string, input: Partial<BoatRentalInput>) {
  const { data } = await api.patch<{ boatRental: BoatRental }>(`/boat-rentals/${id}`, input)
  return data.boatRental
}

export async function deleteBoatRental(id: string) {
  await api.delete(`/boat-rentals/${id}`)
}