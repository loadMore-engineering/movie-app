export default function wikipediaUrlBuilder(name) {
  const pathname = name.replace(/\s/g, '_')
  return `https://en.wikipedia.org/wiki/${pathname}`
}
