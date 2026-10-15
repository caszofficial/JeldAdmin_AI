import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader2, Lock, User as UserIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function mensajeDeError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const code = error.response?.data?.code
    if (code === 'INVALID_CREDENTIALS') return 'Usuario o contraseña incorrectos.'
    if (code === 'VALIDATION_ERROR') return 'Revisa los datos ingresados.'
    if (!error.response) return 'No se pudo conectar con el servidor.'
  }
  return 'No se pudo iniciar sesión. Intenta de nuevo.'
}

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/" replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(loginValue.trim(), password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(mensajeDeError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Panel de marca (visible en pantallas grandes) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 font-serif text-xl font-bold text-gold-400">
            J
          </span>
          <span className="text-sm font-semibold tracking-wide">JELD GROUP</span>
        </div>
        <div>
          <h1 className="font-serif text-4xl font-semibold leading-tight">
            Consola de
            <br />
            administración
          </h1>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            Gestiona servicios, propiedades y listings de JELD GROUP desde un solo lugar.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-600">Panel privado</p>
      </div>

      {/* Formulario */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-8 lg:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 font-serif text-xl font-bold text-gold-400">
              J
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-slate-800">Iniciar sesión</h2>
          <p className="mt-1 text-sm text-slate-500">Ingresa con tu correo o usuario.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                Correo o usuario
              </span>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 px-5 py-3 focus-within:border-primary-500">
                <UserIcon size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={loginValue}
                  onChange={(event) => setLoginValue(event.target.value)}
                  required
                  autoComplete="username"
                  placeholder="tu@correo.com"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">Contraseña</span>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 px-5 py-3 focus-within:border-primary-500">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
