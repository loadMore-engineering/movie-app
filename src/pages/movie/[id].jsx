/* eslint-disable max-len */
import Head from 'next/head'
import { getMovieDetails, getMovieCasts, getSimilarMovie } from 'api/movies'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { CarouselImage } from 'components/section'
import { Chip, Photo } from 'components/common'
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import toHourMinutes from 'utils/toHourMinutes'
import { StarIcon } from '@heroicons/react/solid'

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
      <main className='pt-[100px]'>
        <div className='md:hidden'>
          <CarouselImage
            data={[movieDetails]}
            isInDetailPage
          />
        </div>
        <section className='max-w-screen-xl mx-auto p-3 text-white'>
          <div className='flex gap-2'>
            <div className='relative hidden md:flex h-[450px] min-w-[300px]'>
              {/* <div className='absolute poster-overlay h-full w-full z-10' /> */}
              <Photo
                alt={movieDetails.title}
                className='rounded'
                size='/w342'
                src={movieDetails.poster_path}
              />
            </div>
            <div className='p-4 pt-12 rounded text-sm bg-white bg-opacity-5 text-neutral-400 flex-grow'>
              <article className='mb-6'>
                <h1 className='text-3xl text-white font-bold'>
                  {movieDetails.title}&nbsp;
                  <span className='font-normal text-2xl'>
                    ({new Date(movieDetails.release_date).getFullYear()})
                  </span>
                </h1>
                <div className='flex items-center flex-wrap gap-1 my-3'>
                  <div className='lg:mb-0 flex text-sm items-center mr-2'>
                    <StarIcon className='h-4 w-4 text-primary mr-1' />
                    {movieDetails.vote_average}
                  </div>
                  {movieDetails.genres.map((genre) => (
                    <Chip key={genre.name} text={genre.name} />
                  ))}
                </div>
                {movieDetails.overview}
              </article>
              <div className='flex flex-col gap-y-1'>
                <span>
                  <b>Release Date:</b> {movieDetails.release_date.replace(/-/g, '/')} ({movieDetails.production_countries[0]?.iso_3166_1})
                </span>
                <span>
                  <b>Duration:</b> {toHourMinutes(movieDetails.runtime)}
                </span>
                <span>
                  <b>Homepage: </b>
                  <a
                    className='text-secondary hover:underline'
                    href={movieDetails.homepage}
                    rel='noreferrer'
                    target='_blank'
                  >
                    {movieDetails.homepage}
                  </a>
                </span>
              </div>
            </div>
          </div>
          <h3 className='text-white text-lg my-4'>Top Billed Cast</h3>
          <div className='flex w-full overflow-x-auto gap-2 scroll-hidden my-1' id={id}>
            {movieCast.cast.map((cast) => (
              <div key={cast.cast_id}>
                <div className='h-[150px] w-[120px] relative rounded overflow-hidden'>
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
