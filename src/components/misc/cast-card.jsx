import { Photo } from 'components/common'
import PropTypes from 'prop-types'
import useTextEllipsis from 'hooks/useTextEllipsis'

export default function CastCard({
  name,
  profile_path,
  character,
}) {
  const { ellipsisText } = useTextEllipsis(character, 20)

  return (
    <div>
      <div className='h-[120px] w-[100px] sm:h-[150px] sm:w-[120px] relative rounded overflow-hidden'>
        <Photo
          alt={name}
          priority={false}
          size='/w185'
          src={profile_path}
        />
      </div>
      <div className='flex flex-col p-1'>
        <span className='text-secondary max-w-[90px] sm:max-w-[110px] text-ellipsis'>{name}</span>
        <span className='text-white opacity-40' title={character}>{ellipsisText}</span>
      </div>
    </div>
  )
}

CastCard.propTypes = {
  name: PropTypes.string,
  profile_path: PropTypes.string,
  character: PropTypes.string,
}
