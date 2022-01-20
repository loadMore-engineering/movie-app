import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import ShowcaseCard from 'components/misc/showcase-card'
import { useRouter } from 'next/router'
import CategoryHeader from './category-header'

export default function Showcase({
  title,
  uniqueId,
  params,
  data,
  type,
  indexHref,
  cardHref,
  showViewMore,
}) {
  const id = uniqueId.toLowerCase()
  const scrollRef = useRef()
  const router = useRouter()

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: 0,
      behavior: 'auto',
    })
  }, [router.asPath])

  return (
    <section className='w-full sm:max-w-[1150px] mx-auto mt-4 px-3 p-1 bg-white bg-opacity-5'>
      <CategoryHeader
        href={{
          pathname: indexHref,
          query: { ...params },
        }}
        showViewMore={showViewMore}
        title={title}
      />
      <div
        className='gap-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mb-2'
        id={id}
        ref={scrollRef}
      >
        {data.map((movie) => (
          <div key={movie.id}>
            <ShowcaseCard
              cardHref={cardHref}
              genres={movie.genre_ids}
              id={movie.id}
              img={movie.poster_path}
              overview={movie.overview}
              rating={movie.vote_average}
              title={`${movie.name || movie.title} (${new Date(movie.release_date || movie.first_air_date).getFullYear()})`}
              type={type}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

Showcase.propTypes = {
  title: PropTypes.string.isRequired,
  uniqueId: PropTypes.string.isRequired,
  params: PropTypes.object,
  type: PropTypes.string,
  indexHref: PropTypes.string,
  cardHref: PropTypes.string,
  data: PropTypes.array,
  showViewMore: PropTypes.bool,
}
