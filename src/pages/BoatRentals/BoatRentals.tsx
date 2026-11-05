import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import { deleteBoatRental, getBoatRentals } from '../../api/boatRentals'
import type { BoatRental } from '../../types/boatRental'

export default function BoatRentals() {
  const [items, setItems] = useState<BoatRental[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBoatRentals().then(setItems).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Eliminar este alquiler de bote?')) return
    await deleteBoatRental(id)
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  return (
    <PageContainer
      title="Alquiler de botes"
      actionButton={
        <Link to="/boat-rentals/create" className="bg-black text-white rounded-full px-5 py-3">
          Crear
        </Link>
      }
    >
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-[30px] shadow-lg w-[280px] p-4">
              <Link to={`/boat-rentals/${item.id}`} className="font-bold">{item.name}</Link>
              <p className="text-sm">{item.city}</p>
              <p className="text-sm">${item.pricePerHour}/hora</p>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm mt-2">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}