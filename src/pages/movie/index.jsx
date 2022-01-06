/* eslint-disable arrow-body-style */
import Head from 'next/head'
import CategoryTabs from 'components/section/category-tabs'
import { InfiniteScrollLayout } from 'components/misc'
import { useInfiniteQuery } from 'react-query'
import { useRouter } from 'next/router'
import {
  useState, useMemo, Fragment, useEffect,
} from 'react'
import Card from 'components/misc/card'
import { UglySpinner } from 'components/common'
import { useDebouncedCallback } from 'use-debounce'
import queryConfig from '../../queryConfig'

export default function Movie() {
  const { query: { category } } = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)

  const movieCategory = queryConfig.slice(0, 2)
  const query = movieCategory[category] || queryConfig[0]

  const index = useMemo(() => {
    return queryConfig.map((q) => q.title).indexOf(query?.title)
  }, [query.title])

  const queryMovie = useInfiniteQuery(
    [query.queryKey],
    async ({ pageParam }) => query.queryFn((pageParam || 0) + 1),
    {
      getNextPageParam: ({ page }) => page,
    },
  )

  const dataPages = useMemo(() => queryMovie.data?.pages || [], [queryMovie])

  const totalData = useMemo(() => {
    return dataPages.reduce((prev, cur) => prev + cur.results.length, 0)
  }, [dataPages])

  const debounceQuery = useDebouncedCallback(queryMovie.fetchNextPage, 1000)

  useEffect(() => {
    setActiveIndex(index)
  }, [index])

  useEffect(() => {
    if (totalData === 20) {
      debounceQuery()
    }
  }, [category, debounceQuery, totalData])

  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project - Movie List</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='pt-10 px-2'>
        <CategoryTabs
          activeIndex={activeIndex}
          categories={movieCategory}
          setActiveIndex={setActiveIndex}
        />
        <section className='max-w-screen-xl mx-auto'>
          <InfiniteScrollLayout
            loadMore={queryMovie.fetchNextPage}
            totalData={totalData}
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
          </InfiniteScrollLayout>
        </section>
        {queryMovie.isFetching && !queryMovie.isLoading && (
          <div className='flex-center p-3 bg-sky-700 bg-opacity-70 fixed bottom-10 right-10 z-20 rounded'>
            <UglySpinner />
            <span className='text-white ml-3'>Loading your movie..</span>
          </div>
        )}
      </main>
    </div>
  )
}
