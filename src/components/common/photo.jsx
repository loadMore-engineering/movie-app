import Image from 'next/image'
import PropTypes from 'prop-types'
import env from '../../env'

const { IMAGE_URL } = env

export default function Photo({
  src,
  alt,
  size,
  priority = true,
}) {
  return (
    <Image
      alt={alt}
      className='object-cover'
      layout='fill'
      priority={priority}
      src={`${IMAGE_URL}${size}${src}`}
    />
  )
}

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  priority: PropTypes.bool,
}
