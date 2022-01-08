import { Photo } from 'components/common'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import PropTypes from 'prop-types'

export default function MovieCast(props) {
  const { casts } = props
  const id = 'cast'

  useHorizontalScroll(id)

  return (
    <section>
      <h3 className='text-white text-lg my-4'>Top Billed Cast</h3>
      <div className='flex w-full overflow-x-auto gap-2 scroll-hidden my-1 text-xs sm:text-sm' id={id}>
        {casts.map((cast) => (
          <div key={cast.cast_id}>
            <div className='h-[120px] w-[100px] sm:h-[150px] sm:w-[120px] relative rounded overflow-hidden'>
              <Photo
                alt={cast.name}
                priority={false}
                size='/w185'
                src={cast.profile_path}
              />
            </div>
            <div className='flex flex-col p-1'>
              <p className='text-secondary max-w-[90px] sm:max-w-[110px] text-ellipsis'>{cast.name}</p>
              <p className='text-white opacity-40'>{cast.character}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

MovieCast.propTypes = {
  casts: PropTypes.array,
}
