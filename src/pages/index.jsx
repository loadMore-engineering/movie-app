import Head from 'next/head'
import { CarouselImage, Showcase } from 'components/section'
import { getUpcomingMovie, getPopularMovie } from 'api/movies'
import { getPopularTVShow } from 'api/tvs'

export default function Home() {
  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <CarouselImage />
      <Showcase
        detailHref='/new-release'
        queryFn={getUpcomingMovie}
        queryKey='UPCOMING'
        title='New Release'
      />
      <Showcase
        detailHref='/tv-popular'
        queryFn={getPopularTVShow}
        queryKey='TV_POPULAR'
        title='TV Show'
      />
      <Showcase
        detailHref='/popular'
        queryFn={getPopularMovie}
        queryKey='POPULAR'
        title='Popular'
      />
    </div>
  )
}
