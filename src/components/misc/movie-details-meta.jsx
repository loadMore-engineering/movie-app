import { ExternalLinkIcon, StarIcon } from '@heroicons/react/solid'
import { Chip } from 'components/common'
import useTextEllipsis from 'hooks/useTextEllipsis'
import PropTypes from 'prop-types'
import numberToTime from 'utils/number-to-time'
import Actions from './actions'

export default function MovieDetailsMeta(props) {
  const {
    overview, title, release_date, vote_average, genres, production_companies,
    production_countries, runtime, status, homepage, showModal,
  } = props

  const {
    ellipsisText,
    onCollapse,
    onShowMore,
    isTruncated,
  } = useTextEllipsis(overview || '', 200)

  return (
    <div className='p-2 rounded text-sm md:pt-8 bg-white bg-opacity-5 text-neutral-400 flex-grow min-h-[350px] md:h-[450px]'>
      <div className=' fancy-scroll p-1 flex flex-col overflow-auto h-full'>
        <article className='mb-6'>
          <h1 className='text-3xl text-white font-bold hidden md:flex font-pt-sans'>
            {title} ({new Date(release_date).getFullYear()})
          </h1>
          <div className='md:flex hidden items-center flex-wrap gap-1 my-3'>
            <div className='lg:mb-0 flex text-sm items-center mr-2'>
              <StarIcon className='h-4 w-4 text-yellow-400 mr-1' />
              {vote_average}
            </div>
            {genres.map((genre) => (
              <Chip key={genre.name} text={genre.name} />
            ))}
          </div>
          <p>{ellipsisText}</p>
          {overview.length > 200 && (
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
            <b>Release Date:</b> {release_date.replace(/-/g, '/')} ({production_countries[0]?.iso_3166_1})
          </span>
          <span>
            <b>Duration:</b> {numberToTime(runtime)}
          </span>
          <span>
            <b>Status:</b> {status}
          </span>
          <span>
            <b>Homepage: </b>
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
            <b>Production Companies:</b> {production_companies.map((company) => company.name).join`, `}
          </span>
        </div>
        <Actions showModal={showModal} />
      </div>
    </div>
  )
}

MovieDetailsMeta.propTypes = {
  overview: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  genres: PropTypes.array,
  production_companies: PropTypes.array,
  production_countries: PropTypes.array,
  runtime: PropTypes.number,
  status: PropTypes.string,
  homepage: PropTypes.string,
  showModal: PropTypes.func,
}
