import Head from 'next/head'
import { getMovieDetails, getMovieCasts, getSimilarMovie } from 'api/movies'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { CarouselImage } from 'components/section'
import { Photo } from 'components/common'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import { Fragment } from 'react'

export default function MovieDetails(props) {
  const router = useRouter()
  const { data } = props
  const id = 'cast'

  useHorizontalScroll(id)

  const movieDetails = data?.[0]?.value
  const movieCast = data?.[1]?.value
  const similarMovie = data?.[2]?.value

  console.log('movieDetails', movieDetails)
  console.log('movieCast', movieCast)
  console.log('similarMovie', similarMovie)

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
      <main>
        <CarouselImage
          isEnabled={false}
          reservedData={[movieDetails]}
        />
        <section className='max-w-screen-xl mx-auto p-3 text-white'>
          <span className='text-xl font-semibold'>Synopsis</span>
          <article className='p-4 text-sm opacity-50 bg-white bg-opacity-5 my-2'>
            {movieDetails.overview}
          </article>
          <span className='text-primary'>Cast</span>
          <div className='flex w-full overflow-x-auto gap-2 scroll-hidden my-1' id={id}>
            {movieCast.cast.map((cast) => (
              <div key={cast.cast_id}>
                <div className='h-[150px] min-w-[120px] relative rounded overflow-hidden'>
                  <Photo
                    alt={cast.name}
                    priority={false}
                    size='/w185'
                    src={cast.profile_path}
                  />
                </div>
                <div className='flex flex-col p-1'>
                  <p className='text-secondary text-sm'>{cast.name}</p>
                  <p className='text-white opacity-40 text-sm'>{cast.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
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
