import { useState } from 'react'

export default function useClientPagination({ records }) {
  const DATA_PER_PAGE = 20
  const PAGE_COUNT = Math.ceil(records.length / DATA_PER_PAGE)
  const MAX_PAGE = PAGE_COUNT - 1
  const [page, setPage] = useState(0)

  const goNext = () => setPage((old) => Math.min(old + 1, MAX_PAGE))
  const goPrev = () => setPage((old) => Math.max(old - 1, 0))

  return {
    data: (records || []).slice(page * DATA_PER_PAGE, DATA_PER_PAGE * (page + 1)),
    goNext,
    goPrev,
    pageCount: PAGE_COUNT,
    currentPage: page,
    setPage,
  }
}
