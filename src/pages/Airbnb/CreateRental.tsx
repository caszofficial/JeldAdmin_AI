import { useNavigate } from 'react-router-dom'
import { createProperty } from '../../api/properties'
import PageContainer from '../../components/PageContainer'
import PropertyForm from './PropertyForm'

export default function CreateRental() {
  const navigate = useNavigate()

  return (
    <PageContainer title="Nueva propiedad" onBack={() => navigate('/airbnb')}>
      <PropertyForm
        submitLabel="Crear propiedad"
        onSubmit={async (input) => {
          const property = await createProperty(input)
          navigate(`/airbnb/${property.id}`)
        }}
      />
    </PageContainer>
  )
}
