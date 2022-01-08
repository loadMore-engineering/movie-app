import { useEffect } from 'react'

export default function useHorizontalScroll(id) {
  useEffect(() => {
    const element = document.getElementById(id)
    const functionListener = (evt) => {
      evt.preventDefault()
      if (element) {
        element.scrollLeft += evt.deltaY
      }
    }

    element?.addEventListener('wheel', functionListener)

    return () => {
      element?.removeEventListener('wheel', functionListener)
    }
  }, [id])

  return null
}
