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

// La calificación llega como texto (0 a 5); se muestra siempre con un decimal.
export function formatRating(value: string | number | null | undefined) {
  const number = Number(value)
  if (!value || !Number.isFinite(number) || number <= 0) return null
  return number.toFixed(1)
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
