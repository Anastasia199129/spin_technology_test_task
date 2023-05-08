export const formatDate = (date: string) => {
  const newDate = new Date(parseInt(date))
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  const formattedDate = `${day}. ${month}. ${year}`

  return formattedDate
}