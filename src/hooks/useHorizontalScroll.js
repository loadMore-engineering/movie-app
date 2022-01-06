import { useEffect } from 'react'

export default function useHorizontalScroll(id) {
  useEffect(() => {
    const element = document.getElementById(id)
    const functionListener = (evt) => {
      evt.preventDefault()
      if (element) {
        // eslint-disable-next-line no-param-reassign
        element.scrollLeft += evt.deltaY
      }
    }

    element?.addEventListener('wheel', functionListener)
  }, [id])

  return null
}
