import { api } from './client'
import type { Listing, ListingInput } from '../types/listing'

export async function getListings() {
  const { data } = await api.get<{ listings: Listing[] }>('/listings')
  return data.listings
}

export async function getListing(id: string) {
  const { data } = await api.get<{ listing: Listing }>(`/listings/${id}`)
  return data.listing
}

export async function createListing(input: ListingInput) {
  const { data } = await api.post<{ listing: Listing }>('/listings', input)
  return data.listing
}

export async function updateListing(id: string, input: Partial<ListingInput>) {
  const { data } = await api.patch<{ listing: Listing }>(`/listings/${id}`, input)
  return data.listing
}

export async function deleteListing(id: string) {
  await api.delete(`/listings/${id}`)
}
