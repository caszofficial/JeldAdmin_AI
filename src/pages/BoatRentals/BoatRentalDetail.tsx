import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import { deleteBoatRental, getBoatRental, updateBoatRental } from '../../api/boatRentals'
import type { BoatRental } from '../../types/boatRental'

export default function BoatRentalDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<BoatRental | null>(null)
  const [name, setName] = useState('')

  useEffect(() => {
    if (!id) return
    getBoatRental(id).then((data) => {
      setItem(data)
      setName(data.name)
    })
  }, [id])

  async function handleSave() {
    if (!id) return
    await updateBoatRental(id, { name })
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
        <input value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-full px-5 py-3" />
        <button onClick={handleSave} className="bg-black text-white rounded-full px-5 py-3">Guardar</button>
        <button onClick={handleDelete} className="text-red-600">Eliminar</button>
      </div>
    </PageContainer>
  )
}