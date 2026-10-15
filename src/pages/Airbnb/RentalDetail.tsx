import { useEffect, useState } from 'react'
import {
  Bath,
  BedDouble,
  CalendarClock,
  ExternalLink,
  MapPin,
  Pencil,
  Ruler,
  Star,
  Trash2,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProperty, getProperty, updateProperty } from '../../api/properties'
import ImageGallery from '../../components/ImageGallery'
import PageContainer from '../../components/PageContainer'
import { cleanDescription, formatArea, formatPrice, formatRating } from '../../lib/format'
import type { Property, PropertyInput } from '../../types/property'
import PropertyForm from './PropertyForm'

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

export default function RentalDetail() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getProperty(id)
      .then(setProperty)
      .catch(() => setError('No se encontró la propiedad.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdate(input: PropertyInput) {
    const updated = await updateProperty(id, input)
    setProperty(updated)
    setEditing(false)
  }

  async function handleDelete() {
    if (!window.confirm('¿Eliminar esta propiedad? Esta acción no se puede deshacer.')) return
    setDeleting(true)
    try {
      await deleteProperty(id)
      navigate('/airbnb')
    } catch {
      setError('No se pudo eliminar la propiedad.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <PageContainer title="Propiedad" onBack={() => navigate('/airbnb')}>
        <p className="text-sm text-slate-500">Cargando...</p>
      </PageContainer>
    )
  }

  if (error || !property) {
    return (
      <PageContainer title="Propiedad" onBack={() => navigate('/airbnb')}>
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || 'No se encontró la propiedad.'}
        </p>
      </PageContainer>
    )
  }

  if (editing) {
    return (
      <PageContainer title="Editar propiedad" onBack={() => setEditing(false)}>
        <PropertyForm
          initial={property}
          submitLabel="Guardar cambios"
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </PageContainer>
    )
  }

  const location = [property.address, property.city, property.country].filter(Boolean).join(', ')
  const price = formatPrice(property.price)
  const rating = formatRating(property.rating)
  const area = formatArea(property.sizeSqm)
  const description = cleanDescription(property.description)

  return (
    <PageContainer
      title={property.name}
      onBack={() => navigate('/airbnb')}
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
        <ImageGallery key={property.id} media={property.media} alt={property.name} />

        <div className="space-y-6">
          {rating && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-sm font-semibold text-slate-700">
              <Star size={14} className="fill-gold-400 text-gold-400" />
              {rating}
            </span>
          )}

          {price && (
            <p className="text-2xl font-semibold text-primary-700">
              {price} <span className="text-sm font-normal text-slate-400">/ noche</span>
            </p>
          )}

          {location && (
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={16} />
              {location}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={BedDouble} label="Habitaciones" value={String(property.bedrooms)} />
            <InfoItem icon={Bath} label="Baños" value={String(property.bathrooms)} />
            <InfoItem icon={Ruler} label="Área" value={area ?? 'No indicada'} />
            <InfoItem
              icon={CalendarClock}
              label="Estadía mínima"
              value={`${property.minStayDays} día(s)`}
            />
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

          {property.link && (
            <a
              href={property.link}
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
