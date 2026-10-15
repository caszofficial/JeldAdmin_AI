import { useState } from 'react'
import { ImageOff } from 'lucide-react'

type ImageGalleryProps = {
  media: string[]
  alt: string
}

export default function ImageGallery({ media, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(false)

  if (media.length === 0 || failed) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl bg-slate-100 text-slate-300 sm:h-96">
        <ImageOff size={36} />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <img
        src={media[active]}
        alt={alt}
        onError={() => setFailed(true)}
        className="h-64 w-full rounded-3xl object-cover sm:h-96"
      />

      {media.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {media.map((url, index) => (
            <button
              key={`${url}-${index}`}
              type="button"
              onClick={() => {
                setFailed(false)
                setActive(index)
              }}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-2xl border-2 ${
                index === active ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
