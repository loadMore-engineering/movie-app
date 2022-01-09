import { Photo } from 'components/common'
import { TvDetailsMeta } from 'components/misc'
import PropTypes from 'prop-types'

export default function TvSummary(props) {
  const { tvDetails } = props

  return (
    <div className='flex gap-2'>
      <div className='relative hidden md:flex h-[450px] min-w-[300px]'>
        {/* <div className='absolute poster-overlay h-full w-full z-10' /> */}
        <Photo
          alt={tvDetails.name}
          className='rounded'
          size='/w342'
          src={tvDetails.poster_path}
        />
      </div>
      <TvDetailsMeta {...tvDetails} />
    </div>
  )
}

TvSummary.propTypes = {
  tvDetails: PropTypes.object,
}
