import { getUpcomingMovie, getPopularMovie } from 'api/movies'
import { getPopularTVShow } from 'api/tvs'

const queryConfig = [{
  queryFn: getUpcomingMovie,
  queryKey: 'UPCOMING',
  title: 'New Release',
  type: 'movie',
}, {
  queryFn: getPopularMovie,
  queryKey: 'POPULAR',
  title: 'Popular',
  type: 'movie',
}, {
  queryFn: getPopularTVShow,
  queryKey: 'TV_POPULAR',
  title: 'TV Show',
  type: 'tv',
}]

export default queryConfig
