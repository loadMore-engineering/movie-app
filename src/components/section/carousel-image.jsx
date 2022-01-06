import Slider from 'react-slick'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { ChevronLeftIcon } from '@heroicons/react/solid'
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
  pauseOnHover: false,
}

export default function CarouselImage({ data = [], isInDetailPage = false }) {
  const router = useRouter()

  return (
    <section className='overflow-hidden relative mb-8'>
      {isInDetailPage && (
        <Button
          className='absolute top-10 left-2 z-10'
          icon={<ChevronLeftIcon className='h-7 w-7 text-white' />}
          onClick={() => router.back()}
        />
      )}
      <Slider {...settings}>
        {data.map((item) => (
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
              className='animated'
              size='/original'
              src={item.backdrop_path}
            />
          </div>
        ))}
      </Slider>
    </section>
  )
}

CarouselImage.propTypes = {
  data: PropTypes.array,
  isInDetailPage: PropTypes.bool,
}
