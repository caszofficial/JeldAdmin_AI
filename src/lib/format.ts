// El backend guarda precios y áreas como texto (Decimal) y puede devolver 0 o null.
export function formatPrice(value: string | number | null | undefined) {
  const number = Number(value)
  if (!value || !Number.isFinite(number) || number <= 0) return null
  return `$ ${new Intl.NumberFormat('es-CO').format(number)}`
}

export function formatArea(value: string | number | null | undefined) {
  const number = Number(value)
  if (!value || !Number.isFinite(number) || number <= 0) return null
  return `${new Intl.NumberFormat('es-CO').format(number)} m²`
}

// Las descripciones vienen en Markdown simple; se limpian para mostrarlas como texto plano.
export function cleanDescription(text: string | null) {
  if (!text) return null
  return text
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .trim()
}
