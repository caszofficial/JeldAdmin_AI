import { useState } from 'react'
import { ImageOff, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/format'
import type { Listing } from '../../types/listing'

export default function ListingCard({ listing }: { listing: Listing }) {
  const [imageFailed, setImageFailed] = useState(false)

  const cover = listing.media?.[0]
  const showImage = Boolean(cover) && !imageFailed
  const location = [listing.city, listing.country].filter(Boolean).join(', ')
  const salePrice = formatPrice(listing.salePrice)
  const rentPrice = formatPrice(listing.rentPrice)

  return (
    <Link
      to={`/listings/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-slate-100">
        {showImage ? (
          <img
            src={cover}
            alt={listing.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageOff size={32} />
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          {listing.forSale && (
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Venta
            </span>
          )}
          {listing.forRent && (
            <span className="rounded-full bg-primary-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Alquiler
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="truncate font-semibold text-slate-800">{listing.name}</h2>

        {location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={14} />
            <span className="truncate">{location}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
          {salePrice && <p className="font-semibold text-primary-700">{salePrice}</p>}
          {rentPrice && (
            <p className="text-sm text-slate-500">
              Alquiler: <span className="font-medium text-slate-700">{rentPrice}</span>
            </p>
          )}
          {!salePrice && !rentPrice && (
            <p className="text-sm text-slate-400">Precio no disponible</p>
          )}
        </div>
      </div>
    </Link>
  )
}
