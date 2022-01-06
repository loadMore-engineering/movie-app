import PropTypes from 'prop-types'
import { Photo } from '../common'
import { CardMeta } from '.'

export default function Card({
  title,
  img,
  genres,
  overview,
  rating,
}) {
  return (
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
      <CardMeta
        genres={genres}
        overview={overview}
        rating={rating}
        title={title}
      />
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  genres: PropTypes.array,
  img: PropTypes.string,
  overview: PropTypes.string,
  rating: PropTypes.number,
}
