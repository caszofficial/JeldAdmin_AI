import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import ImageUploader from '../../components/ImageUploader'
import { deleteBoatRental, getBoatRental, updateBoatRental } from '../../api/boatRentals'
import type { BoatRental } from '../../types/boatRental'

export default function BoatRentalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<BoatRental | null>(null)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [media, setMedia] = useState<string[]>([])

  useEffect(() => {
    if (!id) return
    getBoatRental(id).then((data) => {
      setItem(data)
      setName(data.name)
      setCity(data.city ?? '')
      setCountry(data.country ?? '')
      setPricePerHour(data.pricePerHour)
      setMedia(data.media ?? [])
    })
  }, [id])

  async function handleSave() {
    if (!id) return
    await updateBoatRental(id, {
      name,
      city: city || undefined,
      country: country || undefined,
      pricePerHour: Number(pricePerHour),
      media,
    })
    navigate('/boat-rentals')
  }

  async function handleDelete() {
    if (!id) return
    if (!confirm('Eliminar?')) return
    await deleteBoatRental(id)
    navigate('/boat-rentals')
  }

  if (!item) return <PageContainer title="Detalle"><p>Cargando...</p></PageContainer>

  return (
    <PageContainer title={item.name} onBack={() => navigate('/boat-rentals')}>
      <div className="flex flex-col gap-4 max-w-md">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Pais" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} placeholder="Precio por hora" type="number" className="border border-gray-300 rounded-full px-5 py-3" />
        <ImageUploader folder={`boat-rentals/${id ?? 'new'}`} value={media} onChange={setMedia} />
        <button onClick={handleSave} className="bg-black text-white rounded-full px-5 py-3">Guardar</button>
        <button onClick={handleDelete} className="text-red-600">Eliminar</button>
      </div>
    </PageContainer>
  )
}