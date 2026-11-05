import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import { createCarRental } from '../../api/carRentals'

export default function CreateCarRental() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [pricePerDay, setPricePerDay] = useState('')
  const [city, setCity] = useState('')
  const [media, setMedia] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await createCarRental({
      name,
      pricePerDay: Number(pricePerDay),
      city: city || undefined,
      media: media.split('\n').map((s) => s.trim()).filter(Boolean),
    })
    navigate('/car-rentals')
  }

  return (
    <PageContainer title="Crear alquiler de carro" onBack={() => navigate('/car-rentals')}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="Precio por dia" type="number" className="border border-gray-300 rounded-full px-5 py-3" required />
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" className="border border-gray-300 rounded-full px-5 py-3" />
        <textarea value={media} onChange={(e) => setMedia(e.target.value)} placeholder="Fotos (una URL por linea)" className="border border-gray-300 rounded-3xl px-5 py-3" rows={4} />
        <button type="submit" className="bg-black text-white rounded-full px-5 py-3">Crear</button>
      </form>
    </PageContainer>
  )
}