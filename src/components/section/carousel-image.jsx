import { useRef } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Photo, Button } from '../common'
import { BannerMeta, BannerDetailsMeta } from '../misc'

const settings = {
  autoplay: true,
  lazyLoad: true,
  infinite: true,
  fade: true,
  speed: 500,
  autoplaySpeed: 3500,
  slidesToShow: 1,
  slidesToScroll: 1,
  beforeChange: (cur, next) => {
    document.getElementById(`photo${cur}`)?.classList.remove('animated')
    document.getElementById(`photo${next}`)?.classList.add('animated')
  },
}

export default function CarouselImage({
  data = [],
  isInDetailPage = false,
  useAnimation,
}) {
  const router = useRouter()
  const slider = useRef(null)

  const slide = (dir) => {
    if (dir === 'next') {
      slider.current.slickNext()
    } else {
      slider.current.slickPrev()
    }
  }

  return (
    <section className='overflow-hidden relative'>
      {isInDetailPage && (
        <Button
          className='absolute top-10 left-2 z-10'
          icon={<ChevronLeftIcon className='h-7 w-7 text-white' />}
          onClick={() => router.back()}
        />
      )}
      <Slider
        ref={slider}
        {...settings}
      >
        {data.map((item, index) => (
          <div className='banner-image relative overflow-hidden' key={item.id}>
            <div className='banner-image absolute banner-overlay z-10' />
            {isInDetailPage ? (
              <BannerDetailsMeta {...item} />
            ) : (
              <BannerMeta
                genres={item.genre_ids}
                overview={item.overview}
                rating={item.vote_average}
                title={item.title}
              />
            )}
            <Photo
              alt={item.title}
              className={useAnimation ? 'animated transition-all' : ''}
              id={useAnimation ? `photo${index}` : ''}
              size='/original'
              src={item.backdrop_path}
            />
          </div>
        ))}
      </Slider>
      {!isInDetailPage && (
        <div className='absolute h-full w-full z-10 top-0 hidden md:block'>
          <div className='max-w-screen-2xl h-full mx-auto flex justify-between items-center'>
            <Button
              className='p-2 bg-black bg-opacity-10 rounded-full hover:bg-opacity-30 transition-all'
              icon={<ChevronLeftIcon className='h-7 w-7 text-white' />}
              onClick={() => slide('prev')}
            />
            <Button
              className='p-2 bg-black bg-opacity-10 rounded-full hover:bg-opacity-30 transition-all'
              icon={<ChevronRightIcon className='h-7 w-7 text-white' />}
              onClick={() => slide('next')}
            />
          </div>
        </div>
      )}
    </section>
  )
}

CarouselImage.propTypes = {
  data: PropTypes.array,
  isInDetailPage: PropTypes.bool,
  useAnimation: PropTypes.bool,
}
