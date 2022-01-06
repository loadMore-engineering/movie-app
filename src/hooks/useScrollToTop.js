import { useState, useEffect } from 'react'

export default function useScrollToTop() {
  const [visible, setVisible] = useState(false)
  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > 800)
  }
  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return {
    visible,
    scrollToTop,
  }
}
