import clsx from 'clsx'
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
  fallbackSrc,
  priority = true,
  id,
  className,
  isAvatar,
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
      className={clsx('object-cover', className)}
      id={id}
      layout='fill'
      placeholder='blur'
      priority={priority}
      src={
        isAvatar
          ? src
          : `${IMAGE_URL}${size}${src}`
      }
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
  id: PropTypes.string,
  className: PropTypes.string,
  isAvatar: PropTypes.bool,
}
