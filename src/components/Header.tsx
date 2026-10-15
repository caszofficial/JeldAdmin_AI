import { LogOut, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type HeaderProps = {
  onOpenSidebar: () => void
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menú"
        className="text-slate-600 hover:text-slate-900 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-slate-800">{user?.username}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold uppercase text-primary-700">
          {user?.username?.charAt(0)}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  )
}
