import GENRE from 'constant/genre'
import PropTypes from 'prop-types'
import { StarIcon } from '@heroicons/react/solid'
import { Chip, Button } from '../common'

export default function BannerMeta({
  genres = [],
  overview,
  title,
  rating,
}) {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-end z-10 bg-opacity-50'>
      <div className='px-3 xl:max-w-screen-xl mx-auto flex-grow mb-10 xl:mb-[100px]'>
        <div className='flex flex-col h-[200px] justify-end text-white md:ml-8'>
          <span className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold my-2 block md:w-1/2'>{title}</span>
          <div className='flex flex-wrap gap-1'>
            {genres.map((genre) => (
              <Chip key={genre} text={GENRE[genre]} />
            ))}
          </div>
          <div className='my-3 lg:mb-0 flex items-center text-sm md:text-base'>
            <StarIcon className='h-4 w-4 md:h-5 md:w-5 text-primary mr-1' />
            {rating}
          </div>
          <p className='w-1/2 mt-2 mb-4 opacity-90 hidden lg:block'>{overview}</p>
          <Button
            className='watch-now-button'
            title='Watch Now'
          />
        </div>
      </div>
    </div>
  )
}

BannerMeta.propTypes = {
  genres: PropTypes.array,
  overview: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.number,
}
