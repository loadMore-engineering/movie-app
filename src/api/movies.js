import API from 'lib/axios'

export const getNowPlayingMovie = () => API({
  path: '/movie/now_playing',
  params: { page: 1 },
})

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

export const getSimilarMovie = (id, page) => API({
  path: `/movie/${id}/similar`,
  params: {
    page,
  },
})

export const getMovieReviews = (id, page) => API({
  path: `/movie/${id}/reviews`,
  params: {
    page,
  },
})

export const getUpcomingMovie = (page) => API({
  path: '/movie/upcoming',
  params: {
    page,
  },
})

export const getPopularMovie = (page) => API({
  path: '/movie/popular',
  params: {
    page,
  },
})
