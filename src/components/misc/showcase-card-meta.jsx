/* eslint-disable react/no-array-index-key */
import GENRE from 'constant/genre'
import PropTypes from 'prop-types'
import { Chip } from '../common'

export default function CardMeta({
  genres = [],
  title,
}) {
  return (
    <div className='absolute w-full bottom-0 z-10'>
      <div className='flex flex-col h-[200px] justify-end gap-y-1.5 p-1.5'>
        <span className='text-white text-sm group-hover:text-third tracking-wide transition-all'>{title}</span>
        <div className='flex flex-wrap gap-1'>
          {genres.map((genre, index) => (
            <Chip key={index} size='sm' text={GENRE[genre]} />
          ))}
        </div>
      </div>
    </div>
  )
}

CardMeta.propTypes = {
  genres: PropTypes.array,
  title: PropTypes.string,
}
