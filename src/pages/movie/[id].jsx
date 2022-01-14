/* eslint-disable max-len */
import Head from 'next/head'
import {
  getMovieDetails, getMovieCasts, getSimilarMovie, getMovieReviews,
  getTrailerVideos,
} from 'api/movies'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  CarouselImage, Cast, MovieSumamry, Showcase, Reviews,
} from 'components/section'
import { FallbackMode, Modal } from 'components/common'
import Layout from 'components/layout'
import { useState } from 'react'

export default function MovieDetails(props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const router = useRouter()
  const { data } = props

  const movieDetails = data?.[0]?.value
  const movieCast = data?.[1]?.value
  const similarMovie = data?.[2]?.value
  const movieReviews = data?.[3]?.value
  const movieTrailers = data?.[4]?.value

  if (router.isFallback) {
    return <FallbackMode />
  }

  return (
    <div>
      <Head>
        <title>Loadmore - {movieDetails.title}</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] pb-10'>
        <div className='md:hidden'>
          <CarouselImage
            data={[movieDetails]}
            isInDetailPage
          />
        </div>
        <section className='max-w-[1150px] mx-auto p-3 text-white'>
          <MovieSumamry
            movieDetails={movieDetails}
            showModal={() => setIsModalVisible(true)}
          />
          <Reviews data={movieReviews.results} />
          <Cast casts={movieCast.cast} />
        </section>
        <Showcase
          cardHref='/movie'
          data={similarMovie.results}
          indexHref='/movie/similar'
          params={{
            category: 0,
            id: router.query?.id,
          }}
          title='You might also like this!'
          type='movie'
          uniqueId='similar_movie'
        />
      </main>
      <Modal
        closeModal={() => setIsModalVisible()}
        data={movieTrailers.results}
        isModalVisible={isModalVisible}
      />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const response = await Promise.allSettled([
    getMovieDetails({ queryKey: ['MOVIE_DETAILS', { id }] }),
    getMovieCasts({ queryKey: ['MOVIE_CAST', { id }] }),
    getSimilarMovie(id, 1),
    getMovieReviews(id, 1),
    getTrailerVideos(id),
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

MovieDetails.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

MovieDetails.propTypes = {
  data: PropTypes.array,
}
