import { getUpcomingMovie, getPopularMovie } from 'api/movies'
import { getPopularTVShow } from 'api/tvs'

const queryConfig = [{
  queryFn: getUpcomingMovie,
  queryKey: 'UPCOMING',
  title: 'New Release',
  indexHref: '/movie',
  cardHref: '/movie',
}, {
  queryFn: getPopularMovie,
  queryKey: 'POPULAR',
  title: 'Popular',
  indexHref: '/movie',
  cardHref: '/movie',
}, {
  queryFn: getPopularTVShow,
  queryKey: 'TV_POPULAR',
  title: 'TV Show',
  indexHref: '/tv',
  cardHref: '/tv',
}]

export default queryConfig
