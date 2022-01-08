export default function reviewDateFormat(time) {
  const base = new Date(time)
  const date = base.getDate()
  const monthIndex = base.getMonth()
  const year = base.getFullYear()
  const month = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }[monthIndex]

  return `${month} ${date}, ${year}`
}
