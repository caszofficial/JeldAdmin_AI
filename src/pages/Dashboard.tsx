import { Briefcase, Building2, Home } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Section = {
  to: string
  title: string
  description: string
  icon: LucideIcon
}

const sections: Section[] = [
  {
    to: '/services',
    title: 'Servicios',
    description: 'Administra los servicios que ofrece JELD GROUP.',
    icon: Briefcase,
  },
  {
    to: '/airbnb',
    title: 'Airbnb',
    description: 'Gestiona las propiedades de estadía corta.',
    icon: Home,
  },
  {
    to: '/listings',
    title: 'Listings',
    description: 'Publicaciones de venta y alquiler de largo plazo.',
    icon: Building2,
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        <p className="text-sm text-slate-400">Bienvenido de nuevo</p>
        <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{user?.username}</h1>
        <p className="mt-2 max-w-lg text-sm text-slate-400">
          Este es el panel de JELD GROUP. Usa el menú lateral para administrar cada sección.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ to, title, description, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-3xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Icon size={22} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-800">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
