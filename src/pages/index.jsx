import Head from 'next/head'
import { CarouselImage } from 'components/section'
import Showcase from 'components/v2/section/showcase'
import { getNowPlayingMovie } from 'api/movies'
import PropTypes from 'prop-types'
import Layout from 'components/layout'
import queryConfig from '../queryConfig'

export default function Home(props) {
  const { data } = props

  const nowPlayingMovies = (data?.[0]?.value?.results || []).slice(0, 5)

  return (
    <div>
      <Head>
        <title>Loadmore - Movie App</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='pb-10'>
        <CarouselImage data={nowPlayingMovies} useAnimation />
        {queryConfig.map((category, index) => (
          <Showcase
            cardHref={category.cardHref}
            data={data?.[index + 1]?.value?.results}
            indexHref={category.indexHref}
            key={category.title}
            params={{
              category: index,
            }}
            title={category.title}
            uniqueId={category.queryKey}
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
    revalidate: 60 * 60 * 12,
  }
}

Home.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

Home.propTypes = {
  data: PropTypes.array,
}
