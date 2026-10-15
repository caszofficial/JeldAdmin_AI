import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getListings } from '../../api/listings'
import PageContainer from '../../components/PageContainer'
import type { Listing } from '../../types/listing'
import ListingCard from './ListingCard'

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getListings()
      .then(setListings)
      .catch(() => setError('No se pudieron cargar los listings.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageContainer
      title="Listings"
      actionButton={
        <Link
          to="/listings/create"
          className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          <Plus size={16} />
          Nuevo listing
        </Link>
      }
    >
      {loading && <p className="text-sm text-slate-500">Cargando...</p>}

      {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      {!loading && !error && listings.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
          Todavía no hay listings.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </PageContainer>
  )
}
