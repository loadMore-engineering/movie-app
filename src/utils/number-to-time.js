export default function numberToTime(num) {
  const hours = Math.floor(num / 60)
  const minutes = num % 60

  return `${hours}h${minutes ? ` ${minutes}m` : ''}`
}
