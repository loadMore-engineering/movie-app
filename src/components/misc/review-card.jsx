/* eslint-disable react/no-danger */
import { Photo } from 'components/common'
import useTextEllipsis from 'hooks/useTextEllipsis'
import PropTypes from 'prop-types'
import reviewDateFormat from 'utils/reivew-date-format'

export default function ReviewCard({
  content,
  created_at,
  author,
  id,
}) {
  const {
    ellipsisText,
    onCollapse,
    onShowMore,
    isTruncated,
  } = useTextEllipsis(content || '', 200)

  return (
    <div className='mt-4'>
      <div className='flex gap-3 items-center mb-4'>
        <div className='relative h-[35px] w-[35px] rounded-full overflow-hidden'>
          <Photo
            alt='photo'
            isAvatar
            size='/w45'
            src='/user-dummy.png'
          />
        </div>
        <div className='flex flex-col'>
          <span className='text-sm'>{author ?? `User ${id}`}</span>
          <span className='text-left text-gray-400 text-xs'>{reviewDateFormat(created_at)}</span>
        </div>
      </div>
      <p className='text-sm' dangerouslySetInnerHTML={{ __html: ellipsisText }} />
      {content.length > 200 && (
        <button
          className='inline text-secondary underline text-xs'
          type='button'
          onClick={isTruncated ? onShowMore : onCollapse}
        >
          {isTruncated ? 'show more' : 'collapse'}
        </button>
      )}
    </div>
  )
}

ReviewCard.propTypes = {
  content: PropTypes.string,
  created_at: PropTypes.string,
  author: PropTypes.string,
  id: PropTypes.string,
}
