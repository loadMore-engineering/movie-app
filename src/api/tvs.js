import API from 'lib/axios'

export const getPopularTVShow = (page) => API({
  path: '/tv/popular',
  params: {
    page,
  },
})

export const getTVShowDetails = ({ queryKey }) => {
  const [, { id }] = queryKey

  return API({
    path: `/tv/${id}`,
  })
}

export const getSimilarTVShow = (id, page) => API({
  path: `/tv/${id}/similar`,
  params: {
    page,
  },
})

export const getTVShowCasts = ({ queryKey }) => {
  const [, { id }] = queryKey

  return API({
    path: `/tv/${id}/credits`,
  })
}

export const getTVShowReviews = (id, page) => API({
  path: `/tv/${id}/reviews`,
  params: {
    page,
  },
})

export const getTVShowSeasons = (id, season) => API({
  path: `/tv/${id}/season/${season}`,
})

export const getTrailerVideos = (id) => API({
  path: `/tv/${id}/videos`,
})
