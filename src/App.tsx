import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Layout from './layout/Layout'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="services"
              element={
                <Placeholder
                  title="Servicios"
                  description="Aquí podrás crear, editar y eliminar los servicios."
                />
              }
            />
            <Route
              path="airbnb"
              element={
                <Placeholder
                  title="Airbnb"
                  description="Aquí podrás administrar las propiedades de estadía corta."
                />
              }
            />
            <Route
              path="listings"
              element={
                <Placeholder
                  title="Listings"
                  description="Aquí podrás administrar las publicaciones de venta y alquiler."
                />
              }
            />
            <Route
              path="profile"
              element={
                <Placeholder
                  title="Perfil"
                  description="Aquí podrás actualizar tu usuario y correo."
                />
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
