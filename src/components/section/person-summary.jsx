import { Photo } from 'components/common'
import { PersonDetailsMeta } from 'components/misc'
import PropTypes from 'prop-types'

export default function PersonSummary(props) {
  const { personDetails } = props

  return (
    <div className='flex flex-col sm:flex-row gap-2'>
      <div className='relative md:flex h-[450px] min-w-[300px]'>
        <Photo
          alt={personDetails.name}
          className='rounded:none sm:rounded'
          size='/original'
          src={personDetails.profile_path}
        />
      </div>
      <PersonDetailsMeta {...personDetails} />
    </div>
  )
}

PersonSummary.propTypes = {
  personDetails: PropTypes.object,
}
