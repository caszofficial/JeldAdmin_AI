import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import ImageUploader from '../../components/ImageUploader'
import { createBoatRental } from '../../api/boatRentals'

export default function CreateBoatRental() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [city, setCity] = useState('')
  const [media, setMedia] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createBoatRental({
      name,
      pricePerHour: Number(pricePerHour),
      city: city || undefined,
      media,
    })
    navigate('/boat-rentals')
  }

  return (
    <PageContainer title="Crear alquiler de bote" onBack={() => navigate('/boat-rentals')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} placeholder="Precio por hora" type="number" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="border border-gray-300 rounded-full px-5 py-3" />
        <ImageUploader folder="boat-rentals" value={media} onChange={setMedia} />
        <button type="submit" className="bg-black text-white rounded-full px-5 py-3">Crear</button>
      </form>
    </PageContainer>
  )
}