import GENRE from 'constant/genre'
import { StarIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import { Chip } from '../common'

export default function CardMeta({
  genres = [],
  title,
  rating,
}) {
  return (
    <div className='absolute top-[20%] left-2 z-10'>
      <div className='flex flex-col h-[200px] justify-end'>
        <span className='text-white text-sm block group-hover:text-primary tracking-wide transition-all'>{title}</span>
        <div className='flex flex-wrap gap-1 mb-1'>
          {genres.map((genre) => (
            <Chip key={genre} size='sm' text={GENRE[genre]} />
          ))}
        </div>
        <div className='text-white text-xs flex items-center mb-1'>
          <StarIcon className='h-3.5 w-3.5 text-primary mr-1' />
          {rating}
        </div>
      </div>
    </div>
  )
}

CardMeta.propTypes = {
  genres: PropTypes.array,
  title: PropTypes.string,
  rating: PropTypes.number,
}
