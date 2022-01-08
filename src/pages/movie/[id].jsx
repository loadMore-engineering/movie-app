/* eslint-disable max-len */
import Head from 'next/head'
import {
  getMovieDetails, getMovieCasts, getSimilarMovie, getMovieReviews,
} from 'api/movies'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
  CarouselImage, MovieCast, MovieSumamry, Showcase, MovieReviews,
} from 'components/section'

export default function MovieDetails(props) {
  const router = useRouter()
  const { data } = props

  const movieDetails = data?.[0]?.value
  const movieCast = data?.[1]?.value
  const similarMovie = data?.[2]?.value
  const movieReviews = data?.[3]?.value

  if (router.isFallback) {
    return <div>Loading...</div>
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
            data={[movieDetails]}
            isInDetailPage
          />
        </div>
        <section className='max-w-screen-xl mx-auto p-3 text-white'>
          <MovieSumamry movieDetails={movieDetails} />
          <MovieReviews data={movieReviews.results} />
          <MovieCast casts={movieCast.cast} />
        </section>
        <Showcase
          category={0}
          data={similarMovie.results}
          title='You might also like this!'
          type='movie'
          uniqueId='similar_movie'
        />
      </main>
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

MovieDetails.propTypes = {
  data: PropTypes.array,
}
