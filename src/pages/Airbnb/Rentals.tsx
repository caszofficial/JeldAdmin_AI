import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProperties } from '../../api/properties'
import PageContainer from '../../components/PageContainer'
import type { Property } from '../../types/property'
import PropertyCard from './PropertyCard'

export default function Rentals() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .catch(() => setError('No se pudieron cargar las propiedades.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer
      title="Airbnb"
      actionButton={
        <Link
          to="/airbnb/create"
          className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus size={16} />
          Nueva propiedad
        </Link>
      }
    >
      {loading && <p className="text-sm text-slate-500">Cargando...</p>}

      {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {!loading && !error && properties.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
          Todavía no hay propiedades.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </PageContainer>
  )
}
