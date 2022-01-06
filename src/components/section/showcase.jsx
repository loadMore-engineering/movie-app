import PropTypes from 'prop-types'
import { useInfiniteQuery } from 'react-query'
import { useEffect, Fragment } from 'react'
import Card from 'components/misc/card'
import { InfiniteScrollLayout } from 'components/misc'
import { UglySpinner } from 'components/common'
import CategoryHeader from './category-header'
import CategoryTabs from './category-tabs'

export default function Showcase({
  title,
  queryFn,
  queryKey,
  setActiveIndex,
  activeIndex,
  selfIndex,
  categories,
}) {
  const id = queryKey.toLowerCase()

  const queryMovie = useInfiniteQuery(
    [queryKey],
    async ({ pageParam }) => queryFn((pageParam || 0) + 1),
    {
      getNextPageParam: ({ page }) => page,
    },
  )

  const dataPages = queryMovie.data?.pages || []
  const totalData = dataPages.reduce((prev, cur) => prev + cur.results.length, 0)

  useEffect(() => {
    const slider = document.getElementById(id)

    const functionListener = (evt) => {
      evt.preventDefault()
      if (slider) {
        slider.scrollLeft += evt.deltaY
      }
    }

    slider?.addEventListener('wheel', functionListener)

    if (activeIndex === selfIndex) {
      slider?.removeEventListener('wheel', functionListener)
    }

    return () => {
      slider?.removeEventListener('wheel', functionListener)
    }
  }, [id, activeIndex, selfIndex])

  return (
    <section className='w-full sm:max-w-screen-xl mx-auto mb-10 px-3'>
      {activeIndex !== selfIndex ? (
        <Fragment>
          <CategoryHeader
            loadMore={dataPages.length === 1 ? queryMovie.fetchNextPage : () => {}}
            setActiveIndex={() => setActiveIndex(selfIndex)}
            title={title}
          />
          <div
            className='flex overflow-x-auto scroll-hidden gap-x-4 gap-y-2'
            id={id}
          >
            {dataPages.map((dataPage) => (
              <Fragment key={dataPage.page}>
                {dataPage.results.map((dataMovie) => (
                  <div className='min-w-[175px]' key={dataMovie.id}>
                    <Card
                      genres={dataMovie.genre_ids}
                      img={dataMovie.poster_path}
                      overview={dataMovie.overview}
                      rating={dataMovie.vote_average}
                      title={dataMovie.name || dataMovie.title}
                    />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <CategoryTabs
            activeIndex={activeIndex}
            categories={categories}
            clearQueryCache={queryMovie.remove}
            setActiveIndex={setActiveIndex}
          />
          <InfiniteScrollLayout
            loadMore={queryMovie.fetchNextPage}
            totalData={totalData}
          >
            {dataPages.map((dataPage) => (
              <Fragment key={dataPage.page}>
                {dataPage.results.map((dataMovie) => (
                  <Card
                    genres={dataMovie.genre_ids}
                    img={dataMovie.poster_path}
                    key={dataMovie.id}
                    overview={dataMovie.overview}
                    rating={dataMovie.vote_average}
                    title={dataMovie.name || dataMovie.title}
                  />
                ))}
              </Fragment>
            ))}
          </InfiniteScrollLayout>
          {queryMovie.isFetching && (
            <div className='flex-center p-3 bg-sky-700 bg-opacity-70 fixed bottom-10 right-10 z-20 rounded'>
              <UglySpinner />
              <span className='text-white ml-3'>Loading your movie..</span>
            </div>
          )}
        </Fragment>
      )}
    </section>
  )
}

Showcase.propTypes = {
  title: PropTypes.string.isRequired,
  queryFn: PropTypes.func.isRequired,
  queryKey: PropTypes.string.isRequired,
  setActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number,
  selfIndex: PropTypes.number,
  categories: PropTypes.array,
}
