import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import ShowcaseCard from 'components/misc/showcase-card'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import { useRouter } from 'next/router'
import CategoryHeader from './category-header'

export default function Showcase({
  title,
  uniqueId,
  category,
  data,
  type,
}) {
  const id = uniqueId.toLowerCase()
  const scrollRef = useRef()
  const router = useRouter()
  useHorizontalScroll(id)

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: 0,
      behavior: 'auto',
    })
  }, [router.asPath])

  return (
    <section className='w-full sm:max-w-screen-xl mx-auto mb-3 px-3'>
      <CategoryHeader
        href={{
          pathname: `/${type}`,
          query: { category },
        }}
        title={title}
      />
      <div
        className='flex overflow-x-auto fancy-scroll gap-x-4 gap-y-2 pb-2'
        id={id}
        ref={scrollRef}
      >
        {data.map((movie) => (
          <div className='min-w-[175px]' key={movie.id}>
            <ShowcaseCard
              genres={movie.genre_ids}
              id={movie.id}
              img={movie.poster_path}
              overview={movie.overview}
              rating={movie.vote_average}
              title={movie.name || movie.title}
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
  category: PropTypes.number,
  type: PropTypes.string,
  data: PropTypes.array,
}
