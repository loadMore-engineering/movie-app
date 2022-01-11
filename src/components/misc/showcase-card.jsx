import PropTypes from 'prop-types'
import Link from 'next/link'
import { StarIcon } from '@heroicons/react/solid'
import { Photo } from '../common'
import ShowcaseCardMeta from './showcase-card-meta'

export default function ShowcaseCard(props) {
  const {
    title,
    img,
    genres,
    rating,
    id,
    cardHref,
  } = props

  return (
    <Link href={`${cardHref}/${id}`}>
      <a>
        <div className='relative group overflow-hidden max-w-full xl:min-w-[135px]'>
          <div className='absolute poster-overlay h-full w-full z-10' />
          <div className='text-white text-xs flex items-center mb-1 absolute top-0 left-0 z-10 bg-black bg-opacity-80 py-2 pr-2'>
            <StarIcon className='h-4 w-4 text-yellow-400 mr-1' />
            {rating.toFixed(1)}
          </div>
          <div className='relative h-[250px] group-hover:scale-110 transition-transform'>
            <Photo
              alt={title}
              priority={false}
              size='/w342'
              src={img}
            />
          </div>
          <ShowcaseCardMeta
            genres={genres}
            rating={rating}
            title={title}
          />
        </div>
      </a>
    </Link>
  )
}

ShowcaseCard.propTypes = {
  title: PropTypes.string,
  genres: PropTypes.array,
  img: PropTypes.string,
  rating: PropTypes.number,
  id: PropTypes.number,
  cardHref: PropTypes.string,
}
