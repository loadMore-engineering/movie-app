import PropTypes from 'prop-types'
import Link from 'next/link'
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
