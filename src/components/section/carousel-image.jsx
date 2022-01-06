import { useRef } from 'react'
import Slider from 'react-slick'
import { useRouter } from 'next/router'
import { getUpcomingMovie } from 'api/movies'
import { useQuery } from 'react-query'
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
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function CarouselImage({ isEnabled = true, reservedData = [] }) {
  const router = useRouter()
  const slider = useRef(null)
  const movie = useQuery(['NOW_PLAYING', { page: 1 }], getUpcomingMovie, {
    enabled: isEnabled,
  })
  const data = movie.data?.results?.slice(0, 5) || []

  const slide = (dir) => {
    if (dir === 'next') {
      slider.current.slickNext()
    } else {
      slider.current.slickPrev()
    }
  }

  const dataDisplay = isEnabled ? data : reservedData

  return (
    <section className='overflow-hidden relative'>
      {!isEnabled && (
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
        {dataDisplay.map((item) => (
          <div className='banner-image relative overflow-hidden' key={item.id}>
            <div className='banner-image absolute banner-overlay z-10' />
            {isEnabled ? (
              <BannerMeta
                genres={item.genre_ids}
                isDetail={!isEnabled}
                overview={item.overview}
                rating={item.vote_average}
                title={item.title}
              />
            ) : (
              <BannerDetailsMeta {...item} />
            )}
            <Photo
              alt={item.title}
              size='/original'
              src={item.backdrop_path}
            />
          </div>
        ))}
      </Slider>
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
    </section>
  )
}

CarouselImage.propTypes = {
  isEnabled: PropTypes.bool,
  reservedData: PropTypes.array,
}
