/* eslint-disable max-len */
import Head from 'next/head'
import {
  getTVShowDetails, getSimilarTVShow, getTVShowCasts, getTVShowReviews,
  getTrailerVideos,
  getTVShowSeasons,
} from 'api/tvs'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  CarouselImage, Cast, Showcase, Reviews, TvSumamry,
  TvSeason,
} from 'components/section'
import { FallbackMode, Modal } from 'components/common'
import Layout from 'components/layout'
import { useState } from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

export default function TvDetails(props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()
  const { data } = props

  const tvShowDetails = data?.[0]?.value
  const tvShowCast = data?.[1]?.value
  const similarTvShow = data?.[2]?.value
  const tvShowReviews = data?.[3]?.value
  const tvTrailers = data?.[4]?.value

  if (router.isFallback) {
    return <FallbackMode />
  }

  return (
    <div>
      <Head>
        <title>Loadmore - {tvShowDetails.name}</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] pb-10'>
        <div className='md:hidden'>
          <CarouselImage
            data={[tvShowDetails]}
            isInDetailPage
          />
        </div>
        <section className='max-w-[1150px] mx-auto p-3 text-white'>
          <TvSumamry
            showModal={() => setIsModalVisible(true)}
            tvDetails={tvShowDetails}
          />
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
          cardHref='/tv'
          data={similarTvShow.results}
          indexHref='/tv/similar'
          params={{
            category: 0,
            id: router.query.id,
          }}
          title='You might also like this!'
          uniqueId='similar_movie'
        />
      </main>
      <Modal
        closeModal={() => setIsModalVisible()}
        data={tvTrailers.results}
        isModalVisible={isModalVisible}
      />
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
    getTrailerVideos(id),
  ])

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['TV_SEASON'], () => getTVShowSeasons(id, 1))

  return {
    props: {
      data: response,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

TvDetails.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

TvDetails.propTypes = {
  data: PropTypes.array,
}
