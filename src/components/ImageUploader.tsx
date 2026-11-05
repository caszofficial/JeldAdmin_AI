import { useRef, useState } from 'react'
import { deleteUpload, presignUpload } from '../api/uploads'

export default function ImageUploader({
  folder,
  value,
  onChange,
}: {
  folder: string
  value: string[]
  onChange: (urls: string[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const url = await presignUpload(folder, file)
        urls.push(url)
      }
      onChange([...value, ...urls])
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleRemove(url: string) {
    await deleteUpload(url)
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-black text-white rounded-full px-5 py-3 w-fit"
        disabled={uploading}
      >
        {uploading ? 'Subiendo...' : 'Subir imagenes'}
      </button>
      <div className="flex flex-wrap gap-3">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24">
            <img src={url} className="w-full h-full object-cover rounded-xl" />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 text-xs"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}