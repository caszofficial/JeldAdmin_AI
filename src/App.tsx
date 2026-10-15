import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Layout from './layout/Layout'
import CreateRental from './pages/Airbnb/CreateRental'
import RentalDetail from './pages/Airbnb/RentalDetail'
import Rentals from './pages/Airbnb/Rentals'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import CreateListing from './pages/Listings/CreateListing'
import ListingDetail from './pages/Listings/ListingDetail'
import Listings from './pages/Listings/Listings'
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
            <Route path="airbnb" element={<Rentals />} />
            <Route path="airbnb/create" element={<CreateRental />} />
            <Route path="airbnb/:id" element={<RentalDetail />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/create" element={<CreateListing />} />
            <Route path="listings/:id" element={<ListingDetail />} />
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
