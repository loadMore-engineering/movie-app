import Head from 'next/head'
import { CarouselImage, Showcase } from 'components/section'
import { getNowPlayingMovie } from 'api/movies'
import PropTypes from 'prop-types'
import queryConfig from '../queryConfig'

export default function Home(props) {
  const { data } = props

  const nowPlayingMovies = (data?.[0]?.value?.results || []).slice(0, 5)

  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main>
        <CarouselImage data={nowPlayingMovies} />
        {queryConfig.map((category, index) => (
          <Showcase
            data={data?.[index + 1]?.value?.results}
            key={category.title}
            selfIndex={index}
            {...category}
          />
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await Promise.allSettled([
    getNowPlayingMovie(),
    ...queryConfig.map(
      ({ queryFn, queryKey }) => queryFn(
        [queryKey, { page: 1 }],
      ),
    ),
  ])
  return {
    props: {
      data: response,
    },
    revalidate: 1000 * 60 * 60 * 12,
  }
}

Home.propTypes = {
  data: PropTypes.array,
}
