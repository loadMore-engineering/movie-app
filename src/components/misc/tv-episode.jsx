import { Photo } from 'components/common'
import reviewDateFormat from 'utils/reivew-date-format'
import PropTypes from 'prop-types'
import useTextEllipsis from 'hooks/useTextEllipsis'

export default function TvEpisode(props) {
  const { episode } = props
  const MAX_TEXT_LENGTH = 50

  const {
    ellipsisText,
    onCollapse,
    onShowMore,
    isTruncated,
  } = useTextEllipsis(episode.overview || '', MAX_TEXT_LENGTH)

  return (
    <div className='flex gap-3 border-b border-gray-500 pb-3' key={episode.id}>
      <div className='relative min-w-[100px] h-[60px] sm:min-w-[120px] sm:h-[80px]'>
        <Photo
          alt={episode.name}
          priority={false}
          size='/w185'
          src={episode.still_path}
        />
      </div>
      <div>
        <span
          className='text-xs sm:text-sm md:text-base xl:text-sm'
          title={`${episode.name} - ${reviewDateFormat(episode.air_date)}`}
        >
          {episode.episode_number} - {episode.name}
        </span>
        <p className='text-xs sm:text-sm xl:text-xs text-gray-400' title={episode.overview}>{ellipsisText}</p>
        {episode?.overview.length > MAX_TEXT_LENGTH && (
          <button
            className='inline text-secondary underline text-xs'
            type='button'
            onClick={isTruncated ? onShowMore : onCollapse}
          >
            {isTruncated ? 'show more' : 'collapse'}
          </button>
        )}
      </div>
    </div>
  )
}

TvEpisode.propTypes = {
  episode: PropTypes.object,
}
