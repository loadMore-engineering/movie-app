import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useDebouncedCallback } from 'use-debounce'
import useScrollToTop from 'hooks/useScrollToTop'
import { Button, UglySpinner } from 'components/common'
import { Fragment, useEffect, useMemo } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { useInfiniteQuery } from 'react-query'
import Card from './movie-card'

export default function InfiniteScrollLayout({ query }) {
  const { visible, scrollToTop } = useScrollToTop()
  const DATA_PER_PAGE = 20

  const queryMovie = useInfiniteQuery(
    [query.queryKey],
    async ({ pageParam }) => query.queryFn((pageParam || 0) + 1),
    {
      getNextPageParam: ({ page }) => page,
    },
  )

  const debounceLoadMore = useDebouncedCallback(() => queryMovie.fetchNextPage(), 800)

  const dataPages = useMemo(() => queryMovie.data?.pages || [], [queryMovie])

  // eslint-disable-next-line arrow-body-style
  const totalData = useMemo(() => {
    return dataPages.reduce((prev, cur) => prev + cur.results.length, 0)
  }, [dataPages])

  const debounceQuery = useDebouncedCallback(queryMovie.fetchNextPage, 1000)

  useEffect(() => {
    if (totalData === DATA_PER_PAGE) {
      debounceQuery()
    }
  }, [debounceQuery, totalData])

  return (
    <Fragment>
      <InfiniteScroll
        className='gap-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mb-10'
        dataLength={totalData}
        endMessage={null}
        hasMore
        loader={null}
        next={debounceLoadMore}
        scrollThreshold={0.9}
      >
        {dataPages.map((dataPage) => (
          <Fragment key={dataPage.page}>
            {dataPage.results.map((dataMovie) => (
              <Card
                genres={dataMovie.genre_ids}
                id={dataMovie.id}
                img={dataMovie.poster_path}
                key={dataMovie.id}
                overview={dataMovie.overview}
                rating={dataMovie.vote_average}
                title={dataMovie.name || dataMovie.title}
                type={query?.type}
              />
            ))}
          </Fragment>
        ))}
      </InfiniteScroll>
      {visible && (
        <Button
          className='p-2 bg-primary bg-opacity-40 rounded-full hover:bg-opacity-30 transition-all fixed bottom-5 right-5 z-20'
          icon={<ChevronUpIcon className='h-7 w-7 text-primary' />}
          onClick={() => scrollToTop()}
        />
      )}
      {queryMovie.isFetching && queryMovie.isFetchingNextPage && (
        <div className='flex-center p-3 bg-sky-700 bg-opacity-70 fixed bottom-10 left-10 z-20 rounded'>
          <UglySpinner />
          <span className='text-white ml-3'>Loading your movie..</span>
        </div>
      )}
    </Fragment>
  )
}

InfiniteScrollLayout.propTypes = {
  query: PropTypes.object,
}
