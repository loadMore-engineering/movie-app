import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getTVShowSeasons } from 'api/tvs'
import { useEffect, useState } from 'react'
import { TvEpisode } from 'components/misc'

export default function TvSeason(props) {
  const { season, id } = props
  const [seasonNumber, setSeasonNumber] = useState(1)

  const querySeason = useQuery(['TV_SEASON'], () => getTVShowSeasons(id, seasonNumber))
  const seasonDetails = querySeason?.data || {}

  console.log('season', seasonDetails)
  console.log('ID____', id)

  useEffect(() => {
    querySeason.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <section className='bg-white bg-opacity-5 p-2 xl:pr-2 w-full h-full mt-3'>
      <h3 className='text-xl p-2'>Episodes ({seasonDetails?.episodes?.length})</h3>
      <div className='flex flex-col gap-y-3 mt-3 xl:max-h-[575px] overflow-auto fancy-scroll sm:p-2'>
        {seasonDetails?.episodes?.map((episode) => (
          <TvEpisode episode={episode} key={episode.id} />
        ))}
      </div>
    </section>
  )
}

TvSeason.propTypes = {
  season: PropTypes.array,
  id: PropTypes.number,
}
