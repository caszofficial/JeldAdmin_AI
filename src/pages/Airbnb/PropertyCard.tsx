import { useState } from 'react'
import { ImageOff, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, formatRating } from '../../lib/format'
import type { Property } from '../../types/property'

export default function PropertyCard({ property }: { property: Property }) {
  const [imageFailed, setImageFailed] = useState(false)

  const cover = property.media?.[0]
  const showImage = Boolean(cover) && !imageFailed
  const location = [property.city, property.country].filter(Boolean).join(', ')
  const price = formatPrice(property.price)
  const rating = formatRating(property.rating)

  return (
    <Link
      to={`/airbnb/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {showImage ? (
          <img
            src={cover}
            alt={property.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageOff size={32} />
          </div>
        )}

        {rating && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
            <Star size={12} className="fill-gold-400 text-gold-400" />
            {rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="truncate font-semibold text-slate-800">{property.name}</h2>

        {location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} />
            <span className="truncate">{location}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
          {price ? (
            <p className="font-semibold text-primary-700">
              {price} <span className="text-xs font-normal text-slate-400">/ noche</span>
            </p>
          ) : (
            <p className="text-sm text-slate-400">Precio no disponible</p>
          )}
        </div>
      </div>
    </Link>
  )
}
