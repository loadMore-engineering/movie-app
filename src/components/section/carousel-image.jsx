import { useRef } from 'react'
import Slider from 'react-slick'
import { getUpcomingMovie } from 'api/movies'
import { useQuery } from 'react-query'
import { Photo } from 'components/common'
import BannerMeta from './banner-meta'

const settings = {
  autoplay: true,
  dots: false,
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

  console.log(slider.current)

  return (
    <section className='overflow-hidden'>
      <Slider {...settings} ref={slider}>
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
    </section>
  )
}
