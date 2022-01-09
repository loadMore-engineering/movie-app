/* eslint-disable max-len */
import Head from 'next/head'
import {
  getTVShowDetails, getSimilarTVShow, getTVShowCasts, getTVShowReviews,
} from 'api/tvs'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  CarouselImage, Cast, Showcase, Reviews, TvSumamry,
  TvSeason,
} from 'components/section'
import { FallbackMode } from 'components/common'

export default function TvDetails(props) {
  const router = useRouter()
  const { data } = props

  const tvShowDetails = data?.[0]?.value
  const tvShowCast = data?.[1]?.value
  const similarTvShow = data?.[2]?.value
  const tvShowReviews = data?.[3]?.value

  if (router.isFallback) {
    return <FallbackMode />
  }

  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[100px] pb-10'>
        <div className='md:hidden'>
          <CarouselImage
            data={[tvShowDetails]}
            isInDetailPage
          />
        </div>
        <section className='max-w-screen-xl mx-auto p-3 text-white'>
          <TvSumamry tvDetails={tvShowDetails} />
          <div className='xl:grid xl:grid-cols-6 flex flex-col-reverse gap-3 mt-4'>
            <div className='xl:col-span-4 xl:pr-3'>
              <Reviews data={tvShowReviews.results} />
              <Cast casts={tvShowCast.cast} />
            </div>
            <div className='xl:col-span-2'>
              <TvSeason id={tvShowDetails.id} seasons={tvShowDetails.seasons} />
            </div>
          </div>
        </section>
        <Showcase
          category={0}
          data={similarTvShow.results}
          title='You might also like this!'
          type='tv'
          uniqueId='similar_movie'
        />
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const response = await Promise.allSettled([
    getTVShowDetails({ queryKey: ['MOVIE_DETAILS', { id }] }),
    getTVShowCasts({ queryKey: ['MOVIE_CAST', { id }] }),
    getSimilarTVShow(id, 1),
    getTVShowReviews(id, 1),
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

TvDetails.propTypes = {
  data: PropTypes.array,
}
