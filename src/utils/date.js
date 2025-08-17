import dayjs from 'dayjs'

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = dayjs(dateStr)
  return d.isValid() ? d.format('DD/MM/YYYY') : dateStr
}

export const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const t = dayjs(timeStr)
  return t.isValid() ? t.format('HH:mm') : timeStr
}

export const formatDateRange = (start, end) => {
  if (!start) return ''
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  if (!startDate.isValid()) return start
  if (!endDate.isValid() || startDate.isSame(endDate, 'day')) {
    return startDate.format('DD/MM/YYYY')
  }
  return `${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`
}
