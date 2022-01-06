import PropTypes from 'prop-types'
import Card from 'components/misc/card'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import CategoryHeader from './category-header'

export default function Showcase({
  title,
  queryKey,
  selfIndex,
  data,
  type,
}) {
  const id = queryKey.toLowerCase()
  useHorizontalScroll(id)

  return (
    <section className='w-full sm:max-w-screen-xl mx-auto mb-3 px-3'>
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
        {data.map((movie) => (
          <div className='min-w-[175px]' key={movie.id}>
            <Card
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
  queryKey: PropTypes.string.isRequired,
  selfIndex: PropTypes.number,
  type: PropTypes.string,
  data: PropTypes.array,
}
