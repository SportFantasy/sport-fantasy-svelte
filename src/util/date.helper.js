import { DateTime } from 'luxon'


export const getShortDisplayDate = (date) => {
  const dt = DateTime.fromMillis(date)
  return dt.toLocaleString(DateTime.DATE_MED)
}
