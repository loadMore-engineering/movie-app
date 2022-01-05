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

export const getSimilarTVShow = ({ queryKey }) => {
  const [, { id, page }] = queryKey

  return API({
    path: `/tv/${id}/similar`,
    params: {
      page,
    },
  })
}

export const getTVShowCasts = ({ queryKey }) => {
  const [, { id }] = queryKey

  return API({
    path: `/tv/${id}/credits`,
  })
}
