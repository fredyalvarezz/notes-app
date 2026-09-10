// Convierte una fecha ISO en un texto amigable, tipo "hace 3 horas" o "3 sep 2026".
export function formatFriendlyDate(isoDate) {
  const date = new Date(isoDate)
  const now = new Date()
  const diffMs = now - date
  const diffSeconds = Math.round(diffMs / 1000)
  const diffMinutes = Math.round(diffSeconds / 60)
  const diffHours = Math.round(diffMinutes / 60)
  const diffDays = Math.round(diffHours / 24)

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

  if (diffSeconds < 60) {
    return 'hace un momento'
  }
  if (diffMinutes < 60) {
    return rtf.format(-diffMinutes, 'minute')
  }
  if (diffHours < 24) {
    return rtf.format(-diffHours, 'hour')
  }
  if (diffDays < 7) {
    return rtf.format(-diffDays, 'day')
  }

  // Para fechas más antiguas, mostramos la fecha completa en formato legible.
  return date.toLocaleDateString('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
