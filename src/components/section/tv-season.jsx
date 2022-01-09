/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getTVShowSeasons } from 'api/tvs'
import { useEffect, useState, useRef } from 'react'
import { TvEpisode } from 'components/misc'

export default function TvSeason(props) {
  const { seasons, id } = props
  const [seasonNumber, setSeasonNumber] = useState(seasons[0].season_number)
  const scrollRef = useRef()

  const querySeason = useQuery(['TV_SEASON'], () => getTVShowSeasons(id, seasonNumber))
  const seasonDetails = querySeason?.data || {}

  useEffect(() => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setSeasonNumber(seasons[0].season_number)
  }, [id, seasons])

  useEffect(() => {
    querySeason.refetch()
  }, [seasonNumber])

  return (
    <section className='bg-white bg-opacity-5 p-2 xl:pr-2 w-full mt-3'>
      <div className='flex justify-between items-center bg-baseLayer resize-y'>
        {querySeason.isError && (
          <div className='flex-center text-red-500 p-2.5'>
            An error occured!
          </div>
        )}
        {querySeason.isFetching && !querySeason.isError && <span className='p-2.5'>Loading Episodes..</span>}
        {!querySeason.isFetching && !querySeason.isError && <h3 className='text-xl p-2'>Episodes ({seasonDetails?.episodes?.length})</h3>}
        <select
          className='w-[140px] mr-2 bg-baseLayer p-1 my-1 border border-gray-600 rounded text-white outline-none'
          disabled={querySeason.isFetching}
          value={seasonNumber}
          onChange={({ target }) => setSeasonNumber(target.value)}
        >
          {seasons.map((season, index) => (
            <option className='p-2' key={index} value={season.season_number}>Season {index + 1}</option>
          ))}
        </select>
      </div>
      <div
        className='flex flex-col gap-y-3 mt-3 xl:max-h-[575px] overflow-auto fancy-scroll sm:p-2'
        ref={scrollRef}
      >
        {!querySeason.isError && seasonDetails?.episodes?.map((episode, index) => (
          <TvEpisode episode={episode} key={index} />
        ))}
      </div>
    </section>
  )
}

TvSeason.propTypes = {
  seasons: PropTypes.array,
  id: PropTypes.number,
}
