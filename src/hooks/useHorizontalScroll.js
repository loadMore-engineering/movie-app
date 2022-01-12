import { useEffect } from 'react'

export default function useHorizontalScroll(id, castNumber) {
  const MINIMUM_SCROLLABLE = 6
  useEffect(() => {
    const element = document.getElementById(id)
    const functionListener = (evt) => {
      evt.preventDefault()
      if (element && castNumber > MINIMUM_SCROLLABLE) {
        element.scrollLeft += evt.deltaY
      } else {
        element?.removeEventListener('wheel', functionListener)
      }
    }

    element?.addEventListener('wheel', functionListener)

    return () => {
      element?.removeEventListener('wheel', functionListener)
    }
  }, [id, castNumber])

  return null
}
