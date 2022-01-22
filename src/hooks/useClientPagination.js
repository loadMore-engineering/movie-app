import { useState } from 'react'

export default function useClientPagination({ records }) {
  const DATA_PER_PAGE = 20
  const [page, setPage] = useState(0)

  const goNext = () => setPage((old) => old + 1)

  return {
    data: records.slice(page * DATA_PER_PAGE),
  }
}
