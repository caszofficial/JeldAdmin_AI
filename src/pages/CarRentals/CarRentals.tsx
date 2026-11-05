import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import { deleteCarRental, getCarRentals } from '../../api/carRentals'
import type { CarRental } from '../../types/carRental'

export default function CarRentals() {
  const [items, setItems] = useState<CarRental[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCarRentals().then(setItems).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Eliminar este alquiler de carro?')) return
    await deleteCarRental(id)
    setItems((prev) => prev.filter((x) => x.id !== id))
  }

  return (
    <PageContainer
      title="Alquiler de carros"
      actionButton={
        <Link to="/car-rentals/create" className="bg-black text-white rounded-full px-5 py-3">
          Crear
        </Link>
      }
    >
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-[30px] shadow-lg w-[280px] overflow-hidden">
              {item.media?.[0] && <img src={item.media[0]} className="h-[180px] w-full object-cover" alt={item.name} />}
              <div className="p-4">
                <Link to={`/car-rentals/${item.id}`} className="font-bold">{item.name}</Link>
                <p className="text-sm">{item.city}</p>
                <p className="text-sm">${item.pricePerDay}/dia</p>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm mt-2">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}