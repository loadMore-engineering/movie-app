import Head from 'next/head'
import { CarouselImage, Showcase, CategoryTabs } from 'components/section'
import { getUpcomingMovie, getPopularMovie } from 'api/movies'
import { getPopularTVShow } from 'api/tvs'
import { useState } from 'react'

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
      {activeIndex !== -1 && (
        <CategoryTabs
          activeIndex={activeIndex}
          categories={categories}
          setActiveIndex={setActiveIndex}
        />
      )}
      {categories.map((category, index) => (
        (showCategory || activeIndex === index) && (
          <Showcase
            activeIndex={activeIndex}
            key={category.title}
            selfIndex={index}
            setActiveIndex={() => setActiveIndex(index)}
            {...category}
          />
        )
      ))}
    </div>
  )
}
