/* eslint-disable max-len */
import Layout from 'components/layout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import {
  getPerson, getPersonImages, getMovieCredits, getTVCredits,
} from 'api/person'
import { PersonSummary } from 'components/section'
import { useRouter } from 'next/router'
import { FallbackMode } from 'components/common'
import Showcase from 'components/v2/section/showcase'

export default function Person(props) {
  const { data } = props
  const router = useRouter()

  const dataPerson = data?.[0]?.value
  const dataImages = data?.[1]?.value
  const dataMovieCredits = data?.[2]?.value
  const dataTvCredits = data?.[3]?.value

  if (router.isFallback) {
    return <FallbackMode />
  }

  const filteredMovieCredits = dataMovieCredits.cast.filter((movie) => movie.poster_path).slice(0, 20)
  const filteredTvCredits = dataTvCredits.cast.filter((tv) => tv.poster_path).slice(0, 20)
  console.log(filteredTvCredits)

  return (
    <div>
      <Head>
        <title>Loadmore - :v</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] pb-10'>
        {/* <div className='md:hidden'>
          <CarouselImage
            data={[movieDetails]}
            isInDetailPage
          />
        </div> */}
        <section className='max-w-[1150px] mx-auto py-0 sm:py-3 text-white'>
          <PersonSummary
            personDetails={dataPerson}
          />
        </section>
        <Showcase
          cardHref='/movie'
          data={filteredMovieCredits}
          indexHref='/movie/similar'
          params={{
            category: 0,
            id: router.query?.id,
          }}
          showViewMore={dataMovieCredits.cast.length > 20}
          title={`${dataPerson.name} Movies (${dataMovieCredits.cast.length})`}
          type='movie'
          uniqueId='movie_person'
        />
        <Showcase
          cardHref='/tv'
          data={filteredTvCredits}
          indexHref='/movie/similar'
          params={{
            category: 0,
            id: router.query?.id,
          }}
          showViewMore={dataTvCredits.cast.length > 20}
          title={`${dataPerson.name} TV Show (${dataTvCredits.cast.length})`}
          type='movie'
          uniqueId='movie_person'
        />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const response = await Promise.allSettled([
    getPerson(id),
    getPersonImages(id),
    getMovieCredits(id),
    getTVCredits(id),
  ])

  return {
    props: {
      data: response,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

Person.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

Person.propTypes = {
  data: PropTypes.array,
}
