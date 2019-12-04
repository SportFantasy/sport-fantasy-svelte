import { DateTime } from 'luxon'


export const getShortDisplayDate = (date) => {
  try {
    const dt = DateTime.fromMillis(date)
    return dt.toLocaleString(DateTime.DATE_MED)
  } catch (error) {
    return date
  }
}
