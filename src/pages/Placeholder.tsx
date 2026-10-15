import PageContainer from '../components/PageContainer'

type PlaceholderProps = {
  title: string
  description: string
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <PageContainer title={title}>
      <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </PageContainer>
  )
}
