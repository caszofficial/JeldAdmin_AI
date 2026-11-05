import { api } from './client'
import type { CarRental, CarRentalInput } from '../types/carRental'

export async function getCarRentals() {
  const { data } = await api.get<{ carRentals: CarRental[] }>('/car-rentals')
  return data.carRentals
}

export async function getCarRental(id: string) {
  const { data } = await api.get<{ carRental: CarRental }>(`/car-rentals/${id}`)
  return data.carRental
}

export async function createCarRental(input: CarRentalInput) {
  const { data } = await api.post<{ carRental: CarRental }>('/car-rentals', input)
  return data.carRental
}

export async function updateCarRental(id: string, input: Partial<CarRentalInput>) {
  const { data } = await api.patch<{ carRental: CarRental }>(`/car-rentals/${id}`, input)
  return data.carRental
}

export async function deleteCarRental(id: string) {
  await api.delete(`/car-rentals/${id}`)
}