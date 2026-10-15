import { useEffect, useState } from 'react'
import { Bath, BedDouble, ExternalLink, MapPin, Pencil, Ruler, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteListing, getListing, updateListing } from '../../api/listings'
import ImageGallery from '../../components/ImageGallery'
import PageContainer from '../../components/PageContainer'
import { cleanDescription, formatArea, formatPrice } from '../../lib/format'
import type { Listing, ListingInput } from '../../types/listing'
import ListingForm from './ListingForm'

function InfoItem({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  )
}

export default function ListingDetail() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getListing(id)
      .then(setListing)
      .catch(() => setError('No se encontró el listing.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdate(input: ListingInput) {
    const updated = await updateListing(id, input)
    setListing(updated)
    setEditing(false)
  }

  async function handleDelete() {
    if (!window.confirm('¿Eliminar este listing? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    try {
      await deleteListing(id)
      navigate('/listings')
    } catch {
      setError('No se pudo eliminar el listing.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <PageContainer title="Listing" onBack={() => navigate('/listings')}>
        <p className="text-sm text-slate-500">Cargando...</p>
      </PageContainer>
    )
  }

  if (error || !listing) {
    return (
      <PageContainer title="Listing" onBack={() => navigate('/listings')}>
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || 'No se encontró el listing.'}
        </p>
      </PageContainer>
    )
  }

  if (editing) {
    return (
      <PageContainer title="Editar listing" onBack={() => setEditing(false)}>
        <ListingForm
          initial={listing}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </PageContainer>
    )
  }

  const location = [listing.address, listing.city, listing.country].filter(Boolean).join(', ')
  const salePrice = formatPrice(listing.salePrice)
  const rentPrice = formatPrice(listing.rentPrice)
  const area = formatArea(listing.sizeSqm)
  const description = cleanDescription(listing.description)

  return (
    <PageContainer
      title={listing.name}
      onBack={() => navigate('/listings')}
      actionButton={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ImageGallery key={listing.id} media={listing.media} alt={listing.name} />

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {listing.forSale && (
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                En venta
              </span>
            )}
            {listing.forRent && (
              <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
                En alquiler
              </span>
            )}
          </div>

          <div className="space-y-1">
            {salePrice && (
              <p className="text-2xl font-semibold text-primary-700">{salePrice}</p>
            )}
            {rentPrice && (
              <p className="text-sm text-slate-500">
                Alquiler: <span className="font-medium text-slate-700">{rentPrice}</span>
              </p>
            )}
          </div>

          {location && (
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} />
              {location}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem icon={BedDouble} label="Habitaciones" value={String(listing.bedrooms)} />
            <InfoItem icon={Bath} label="Baños" value={String(listing.bathrooms)} />
            <InfoItem icon={Ruler} label="Área" value={area ?? 'No indicada'} />
          </div>

          {description && (
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Descripción
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          )}

          {listing.link && (
            <a
              href={listing.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <ExternalLink size={16} />
              Ver enlace
            </a>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
