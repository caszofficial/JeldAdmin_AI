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
import BoatRentals from './pages/BoatRentals/BoatRentals'
import CreateBoatRental from './pages/BoatRentals/CreateBoatRental'
import BoatRentalDetail from './pages/BoatRentals/BoatRentalDetail'
import CarRentals from './pages/CarRentals/CarRentals'
import CreateCarRental from './pages/CarRentals/CreateCarRental'
import CarRentalDetail from './pages/CarRentals/CarRentalDetail'
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
            <Route path="boat-rentals" element={<BoatRentals />} />
            <Route path="boat-rentals/create" element={<CreateBoatRental />} />
            <Route path="boat-rentals/:id" element={<BoatRentalDetail />} />
            <Route path="car-rentals" element={<CarRentals />} />
            <Route path="car-rentals/create" element={<CreateCarRental />} />
            <Route path="car-rentals/:id" element={<CarRentalDetail />} />
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
