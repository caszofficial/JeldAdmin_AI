import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import ImageUploader from '../../components/ImageUploader'
import { createCarRental } from '../../api/carRentals'

export default function CreateCarRental() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [city, setCity] = useState('')
  const [seats, setSeats] = useState('')
  const [transmission, setTransmission] = useState('')
  const [minRentalDays, setMinRentalDays] = useState('1')
  const [media, setMedia] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createCarRental({
      name,
      pricePerDay: Number(pricePerDay),
      city: city || undefined,
      seats: seats ? Number(seats) : undefined,
      transmission: transmission || undefined,
      minRentalDays: minRentalDays ? Number(minRentalDays) : undefined,
      media,
    })
    navigate('/car-rentals')
  }

  return (
    <PageContainer title="Crear alquiler de carro" onBack={() => navigate('/car-rentals')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="Precio por dia" type="number" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Asientos" type="number" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={transmission} onChange={(e) => setTransmission(e.target.value)} placeholder="Transmision" className="border border-gray-300 rounded-full px-5 py-3" />
        <input value={minRentalDays} onChange={(e) => setMinRentalDays(e.target.value)} placeholder="Dias minimos" type="number" className="border border-gray-300 rounded-full px-5 py-3" />
        <ImageUploader folder={`car-rentals/${(name.trim() || 'carro').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} value={media} onChange={setMedia} />
        <button type="submit" className="bg-black text-white rounded-full px-5 py-3">Crear</button>
      </form>
    </PageContainer>
  )
}