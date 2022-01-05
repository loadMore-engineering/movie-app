import { useRef } from 'react'
import Slider from 'react-slick'
import { getUpcomingMovie } from 'api/movies'
import { useQuery } from 'react-query'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { Photo, Button } from '../common'
import { BannerMeta } from '../misc'

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

export default function CarouselImage() {
  const slider = useRef(null)
  const movie = useQuery(['NOW_PLAYING', { page: 1 }], getUpcomingMovie)
  const data = movie.data?.results?.slice(0, 5) || []

  const slide = (dir) => {
    if (dir === 'next') {
      slider.current.slickNext()
    } else {
      slider.current.slickPrev()
    }
  }

  return (
    <section className='overflow-hidden relative'>
      <Slider
        ref={slider}
        {...settings}
      >
        {data.map((item) => (
          <div className='banner-image relative overflow-hidden' key={item.id}>
            <div className='banner-image absolute banner-overlay z-10' />
            <BannerMeta
              genres={item.genre_ids}
              overview={item.overview}
              rating={item.vote_average}
              title={item.title}
            />
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
