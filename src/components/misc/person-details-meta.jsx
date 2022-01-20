import { ExternalLinkIcon } from '@heroicons/react/solid'
import useTextEllipsis from 'hooks/useTextEllipsis'
import PropTypes from 'prop-types'
import reviewDateFormat from 'utils/reivew-date-format'
import calculateAge from 'utils/calculate-age'
import wikipediaUrlBuilder from 'utils/wikipedia-url-builder'

export default function PersonDetailsMeta(props) {
  const {
    biography, birthday, known_for_department, place_of_birth,
    also_known_as, gender, deathday, name, homepage,
  } = props
  const MAX_TEXT_LENGTH = 200
  const {
    ellipsisText,
    onCollapse,
    onShowMore,
    isTruncated,
  } = useTextEllipsis(biography || '', MAX_TEXT_LENGTH)

  return (
    <div className='p-2 rounded text-sm md:pt-8 bg-white bg-opacity-5 text-neutral-400 flex-grow min-h-[350px] md:h-[450px]'>
      <div className=' fancy-scroll p-1 flex flex-col overflow-auto h-full'>
        <article className='mb-6'>
          <h1 className='text-3xl text-white hidden md:flex font-pt-sans'>
            {name}
          </h1>
          <span>{known_for_department}</span>
          <p className='mt-4'>{ellipsisText}</p>
          {biography.length > MAX_TEXT_LENGTH && (
            <button
              className='inline text-secondary underline text-xs'
              type='button'
              onClick={isTruncated ? onShowMore : onCollapse}
            >
              {isTruncated ? 'show more' : 'collapse'}
            </button>
          )}
        </article>
        <div className='flex flex-col gap-y-1 mb-6 sm:mb-10'>
          <span>
            <span className='text-neutral-200'>Born:</span> {reviewDateFormat(birthday)} ({calculateAge(birthday)} years old)
          </span>
          {deathday && (
            <span>
              <span className='text-neutral-200'>Died:</span> {reviewDateFormat(deathday)}
            </span>
          )}
          <span>
            <span className='text-neutral-200'>Place of Birth:</span> {place_of_birth}
          </span>
          <span>
            <span className='text-neutral-200'>Gender: </span> {gender === 1 ? 'Female' : 'Male'}
          </span>
          <span>
            <span className='text-neutral-200'>Homepage: </span>
            {homepage ? (
              <a
                className='text-secondary hover:underline'
                href={homepage}
                rel='noreferrer'
                target='_blank'
              >
                Visit Website <ExternalLinkIcon className='h-5 w-5 mb-1 inline' />
              </a>
            ) : '-'}
          </span>
          <span>
            <span className='text-neutral-200'>Also Known As:</span> {also_known_as.join(', ')}
          </span>
          <span>
            <span className='text-neutral-200'>Wikipedia: </span>
            <a
              className='text-secondary hover:underline'
              href={wikipediaUrlBuilder(name)}
              rel='noreferrer'
              target='_blank'
            >
              {wikipediaUrlBuilder(name)} <ExternalLinkIcon className='h-5 w-5 mb-1 inline' />
            </a>
          </span>
        </div>
        {/* <Actions showModal={showModal} /> */}
      </div>
    </div>
  )
}

PersonDetailsMeta.propTypes = {
  biography: PropTypes.string,
  birthday: PropTypes.string,
  known_for_department: PropTypes.string,
  place_of_birth: PropTypes.string,
  also_known_as: PropTypes.array,
  gender: PropTypes.number,
  deathday: PropTypes.string,
  name: PropTypes.string,
  homepage: PropTypes.string,
}
