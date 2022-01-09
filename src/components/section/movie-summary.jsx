import { Photo } from 'components/common'
import { MovieDetailsMeta } from 'components/misc'
import PropTypes from 'prop-types'

export default function MovieSummary(props) {
  const { movieDetails, showModal } = props

  return (
    <div className='flex gap-2'>
      <div className='relative hidden md:flex h-[450px] min-w-[300px]'>
        {/* <div className='absolute poster-overlay h-full w-full z-10' /> */}
        <Photo
          alt={movieDetails.title}
          className='rounded'
          size='/w342'
          src={movieDetails.poster_path}
        />
      </div>
      <MovieDetailsMeta
        showModal={showModal}
        {...movieDetails}
      />
    </div>
  )
}

MovieSummary.propTypes = {
  movieDetails: PropTypes.object,
  showModal: PropTypes.func,
}
