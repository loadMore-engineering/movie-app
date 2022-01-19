/* eslint-disable import/prefer-default-export */
import API from 'lib/axios'

export const getPerson = (id) => API({
  path: `/person/${id}`,
})

export const getPopularPerson = (page) => API({
  path: '/person/popular',
  params: {
    page,
  },
})

export const getPersonImages = (id) => API({
  path: `/person/${id}/images`,
})

export const getMovieCredits = (id) => API({
  path: `/person/${id}/movie_credits`,
})

export const getTVCredits = (id) => API({
  path: `/person/${id}/tv_credits`,
})
