import PropTypes from 'prop-types'
import { StarIcon } from '@heroicons/react/solid'
import { Chip } from '../common'

export default function BannerMeta({
  genres = [],
  title,
  name,
  vote_average,
  release_date,
  first_air_date,
}) {
  const releaseDate = new Date(release_date || first_air_date).getFullYear()
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-end z-10 bg-opacity-50'>
      <div className='px-3 xl:max-w-screen-xl mx-auto flex-grow mb-1 xl:mb-[150px]'>
        <div className='flex flex-col h-[200px] justify-end text-white'>
          <span className='text-xl sm:text-3xl md:text-5xl font-semibold block mb-1 md:w-1/2'>{title || name}</span>
          <div className='flex flex-wrap gap-1 mb-1'>
            {genres.map((genre) => (
              <Chip key={genre.name} size='sm' text={genre.name} />
            ))}
          </div>
          <div className='lg:mb-0 flex text-sm items-center'>
            <StarIcon className='h-4 w-4 text-primary mr-1' />
            {vote_average}
            <span className='text-xs ml-2'>Release Year: {releaseDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

BannerMeta.propTypes = {
  name: PropTypes.string,
  first_air_date: PropTypes.string,
  genres: PropTypes.array,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
}
