import PropTypes from 'prop-types'
import Link from 'next/link'
import { Photo } from '../common'
import ShowcaseCardMeta from './showcase-card-meta'

export default function Card(props) {
  const {
    title,
    img,
    genres,
    overview,
    rating,
    id,
    type,
  } = props
  const path = type === 'movie' ? 'movie' : 'tv'

  return (
    <Link href={`/${path}/${id}`}>
      <a>
        <div className='relative group overflow-hidden max-w-full xl:min-w-[175px]'>
          <div className='absolute poster-overlay h-full w-full z-10' />
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
            overview={overview}
            rating={rating}
            title={title}
          />
        </div>
      </a>
    </Link>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  genres: PropTypes.array,
  img: PropTypes.string,
  overview: PropTypes.string,
  rating: PropTypes.number,
  id: PropTypes.number,
  type: PropTypes.string,
}
