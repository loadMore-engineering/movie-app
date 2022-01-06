import Image from 'next/image'
import PropTypes from 'prop-types'
import { useState } from 'react'
import clsx from 'clsx'
import env from '../../env'
import imagePlaceholder from './image-placeholder'

const { IMAGE_URL } = env

export default function Photo({
  src,
  alt,
  size,
  fallbackSrc,
  priority = true,
  className,
}) {
  const [isError, setIsError] = useState()

  if (isError) {
    return (
      <Image
        alt='error'
        className='object-cover'
        layout='fill'
        src={fallbackSrc || '/image-error.png'}
      />
    )
  }
  return (
    <Image
      alt={alt}
      blurDataURL={imagePlaceholder()}
      className={clsx(className, 'object-cover')}
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
  fallbackSrc: PropTypes.string,
  className: PropTypes.string,
}
