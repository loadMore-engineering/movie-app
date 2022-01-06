import Head from 'next/head'
import { CarouselImage, Showcase } from 'components/section'
import { getUpcomingMovie, getPopularMovie } from 'api/movies'
import { getPopularTVShow } from 'api/tvs'
import { useState } from 'react'
import BreakpointDetector from 'components/misc/breakpoint-detector'

const categories = [{
  queryFn: getUpcomingMovie,
  queryKey: 'UPCOMING',
  title: 'New Release',
}, {
  queryFn: getPopularTVShow,
  queryKey: 'TV_POPULAR',
  title: 'TV Show',
}, {
  queryFn: getPopularMovie,
  queryKey: 'POPULAR',
  title: 'Popular',
}]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const showCategory = activeIndex === -1

  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <CarouselImage />
      {categories.map((category, index) => (
        (showCategory || activeIndex === index) && (
          <Showcase
            activeIndex={activeIndex}
            categories={categories}
            key={category.title}
            selfIndex={index}
            setActiveIndex={setActiveIndex}
            {...category}
          />
        )
      ))}
      <BreakpointDetector />
    </div>
  )
}
