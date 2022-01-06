import PropTypes from 'prop-types'
import { useInfiniteQuery } from 'react-query'
import { Fragment } from 'react'
import Card from 'components/misc/card'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import CategoryHeader from './category-header'

export default function Showcase({
  title,
  queryFn,
  queryKey,
  selfIndex,
  type,
}) {
  const id = queryKey.toLowerCase()
  useHorizontalScroll(id)

  const queryMovie = useInfiniteQuery(
    [queryKey],
    async ({ pageParam }) => queryFn((pageParam || 0) + 1),
    {
      getNextPageParam: ({ page }) => page,
    },
  )

  const dataPages = queryMovie.data?.pages || []

  return (
    <section className='w-full sm:max-w-screen-xl mx-auto mb-10 px-3'>
      <CategoryHeader
        href={{
          pathname: `/${type}`,
          query: { category: selfIndex },
        }}
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
                  id={dataMovie.id}
                  img={dataMovie.poster_path}
                  overview={dataMovie.overview}
                  rating={dataMovie.vote_average}
                  title={dataMovie.name || dataMovie.title}
                  type={type}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

Showcase.propTypes = {
  title: PropTypes.string.isRequired,
  queryFn: PropTypes.func.isRequired,
  queryKey: PropTypes.string.isRequired,
  selfIndex: PropTypes.number,
  type: PropTypes.string,
}
