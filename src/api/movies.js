import API from 'lib/axios'

export const getNowPlayingMovie = ({ queryKey }) => {
  const [, params] = queryKey

  return API({
    path: '/movie/now_playing',
    params,
  })
}

export const getMovieDetails = ({ queryKey }) => {
  const [, { id }] = queryKey

  return API({
    path: `/movie/${id}`,
  })
}

export const getMovieCasts = ({ queryKey }) => {
  const [, { id }] = queryKey

  return API({
    path: `/movie/${id}/credits`,
  })
}

export const getSimilarMovie = ({ queryKey }) => {
  const [, { id, page }] = queryKey

  return API({
    path: `/movie/${id}/similar`,
    params: {
      page,
    },
  })
}

export const getUpcomingMovie = ({ queryKey }) => {
  const [, params] = queryKey

  return API({
    path: '/movie/upcoming',
    params,
  })
}

export const getPopularMovie = ({ queryKey }) => {
  const [, params] = queryKey

  return API({
    path: '/movie/popular',
    params,
  })
}
