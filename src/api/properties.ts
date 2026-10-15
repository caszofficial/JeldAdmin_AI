import { api } from './client'
import type { Property, PropertyInput } from '../types/property'

export async function getProperties() {
  const { data } = await api.get<{ properties: Property[] }>('/properties')
  return data.properties
}

export async function getProperty(id: string) {
  const { data } = await api.get<{ property: Property }>(`/properties/${id}`)
  return data.property
}

export async function createProperty(input: PropertyInput) {
  const { data } = await api.post<{ property: Property }>('/properties', input)
  return data.property
}

export async function updateProperty(id: string, input: Partial<PropertyInput>) {
  const { data } = await api.patch<{ property: Property }>(`/properties/${id}`, input)
  return data.property
}

export async function deleteProperty(id: string) {
  await api.delete(`/properties/${id}`)
}
