import { useState } from 'react'
import type { FormEvent } from 'react'
import { Loader2 } from 'lucide-react'
import type { Property, PropertyInput } from '../../types/property'

type PropertyFormProps = {
  initial?: Property
  submitLabel: string
  onSubmit: (input: PropertyInput) => Promise<void>
  onCancel?: () => void
}

const inputClass =
  'w-full rounded-full border border-slate-200 px-5 py-2.5 text-sm text-slate-800 outline-none focus:border-primary-500'

export default function PropertyForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [address, setAddress] = useState(initial?.address ?? '')
  const [city, setCity] = useState(initial?.city ?? '')
  const [country, setCountry] = useState(initial?.country ?? '')
  const [price, setPrice] = useState(initial?.price ?? '')
  const [rating, setRating] = useState(initial?.rating ?? '')
  const [minStayDays, setMinStayDays] = useState(String(initial?.minStayDays ?? ''))
  const [bedrooms, setBedrooms] = useState(String(initial?.bedrooms ?? ''))
  const [bathrooms, setBathrooms] = useState(String(initial?.bathrooms ?? ''))
  const [sizeSqm, setSizeSqm] = useState(initial?.sizeSqm ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [link, setLink] = useState(initial?.link ?? '')
  const [media, setMedia] = useState((initial?.media ?? []).join('\n'))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function buildInput(): PropertyInput | null {
    if (!name.trim()) {
      setError('El nombre es obligatorio.')
      return null
    }
    if (price === '' || Number(price) < 0) {
      setError('El precio por noche es obligatorio.')
      return null
    }
    if (minStayDays === '' || Number(minStayDays) < 1) {
      setError('La estadía mínima debe ser de al menos 1 día.')
      return null
    }
    if (bedrooms === '' || bathrooms === '') {
      setError('Habitaciones y baños son obligatorios.')
      return null
    }
    if (rating !== '' && (Number(rating) < 0 || Number(rating) > 5)) {
      setError('La calificación debe estar entre 0 y 5.')
      return null
    }

    const input: PropertyInput = {
      name: name.trim(),
      price: Number(price),
      minStayDays: Number(minStayDays),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      media: media
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean),
    }

    if (address.trim()) input.address = address.trim()
    if (city.trim()) input.city = city.trim()
    if (country.trim()) input.country = country.trim()
    if (description.trim()) input.description = description.trim()
    if (link.trim()) input.link = link.trim()
    if (sizeSqm !== '') input.sizeSqm = Number(sizeSqm)
    if (rating !== '') input.rating = Number(rating)

    return input
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')

    const input = buildInput()
    if (!input) return

    setSaving(true)
    try {
      await onSubmit(input)
    } catch {
      setError('No se pudo guardar. Revisa los datos e intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-700">Nombre *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-slate-700">Dirección</span>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-slate-700">Ciudad</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-slate-700">País</span>
          <input value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
        </label>

        <label>
          <span className="mb-1 block text-sm font-medium text-slate-700">Enlace</span>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </label>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Precio y estadía
        </h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Precio por noche *
            </span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Estadía mínima (días) *
            </span>
            <input
              type="number"
              min="1"
              value={minStayDays}
              onChange={(e) => setMinStayDays(e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">
              Calificación (0 a 5)
            </span>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Detalles</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">Habitaciones *</span>
            <input
              type="number"
              min="0"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">Baños *</span>
            <input
              type="number"
              min="0"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <span className="mb-1 block text-sm font-medium text-slate-700">Área (m²)</span>
            <input
              type="number"
              min="0"
              value={sizeSqm}
              onChange={(e) => setSizeSqm(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Descripción</span>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-800 outline-none focus:border-primary-500"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Imágenes (una URL por línea)
          </span>
          <textarea
            rows={4}
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-3xl border border-slate-200 px-5 py-3 text-sm text-slate-800 outline-none focus:border-primary-500"
          />
        </label>
      </section>

      {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
