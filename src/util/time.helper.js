export const getUnixTimeStampFromDate = (date) => {
  if (!date) {
    return date
  }
  return new Date(date).getTime()
}
