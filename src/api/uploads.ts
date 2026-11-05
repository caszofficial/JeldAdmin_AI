import { api } from './client'

export async function presignUpload(folder: string, file: File) {
  const { data } = await api.post<{ uploadUrl: string; fileUrl: string; key: string }>(
    '/uploads/presign',
    { folder, filename: file.name, contentType: file.type || 'application/octet-stream' }
  )
  await fetch(data.uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  })
  return data.fileUrl
}

export async function deleteUpload(url: string) {
  await api.delete('/uploads', { data: { url } })
}