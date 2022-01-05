import Image from 'next/image'
import PropTypes from 'prop-types'
import { useState } from 'react'
import env from '../../env'
import imagePlaceholder from './image-placeholder'

const { IMAGE_URL } = env

export default function Photo({
  src,
  alt,
  size,
  priority = true,
}) {
  const [isError, setIsError] = useState()

  if (isError) {
    return (
      <Image
        alt='error'
        layout='fill'
        src='/image-error.png'
      />
    )
  }
  return (
    <Image
      alt={alt}
      blurDataURL={imagePlaceholder()}
      className='object-cover'
      layout='fill'
      placeholder='blur'
      priority={priority}
      src={`${IMAGE_URL}${size}${src}`}
      onError={() => setIsError(true)}
    />
  )
}

Photo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  priority: PropTypes.bool,
}
