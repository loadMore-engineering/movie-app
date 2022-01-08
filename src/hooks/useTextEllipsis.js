import { useState } from 'react'

export default function useTextEllipsis(text, max) {
  const [limit, setLimit] = useState(max)
  const ellipsis = limit < text.length ? '...' : ''
  const result = `${text.slice(0, Math.max(limit, 0))}${ellipsis}`

  const onShowMore = () => setLimit(text.length)
  const onCollapse = () => setLimit(max)

  return {
    ellipsisText: result,
    onShowMore,
    onCollapse,
    isTruncated: limit < text.length,
  }
}
