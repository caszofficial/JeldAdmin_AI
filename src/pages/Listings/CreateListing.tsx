import { useNavigate } from 'react-router-dom'
import { createListing } from '../../api/listings'
import PageContainer from '../../components/PageContainer'
import ListingForm from './ListingForm'

export default function CreateListing() {
  const navigate = useNavigate()

  return (
    <PageContainer title="Nuevo listing" onBack={() => navigate('/listings')}>
      <ListingForm
        submitLabel="Crear listing"
        onSubmit={async (input) => {
          const listing = await createListing(input)
          navigate(`/listings/${listing.id}`)
        }}
      />
    </PageContainer>
  )
}
