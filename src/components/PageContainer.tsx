import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

type PageContainerProps = {
  title: string
  onBack?: () => void
  actionButton?: ReactNode
  children: ReactNode
}

export default function PageContainer({ title, onBack, actionButton, children }: PageContainerProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">{title}</h1>
        </div>
        {actionButton}
      </header>
      {children}
    </section>
  )
}
