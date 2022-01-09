/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getTVShowSeasons } from 'api/tvs'
import { useEffect, useState, useRef } from 'react'
import { TvEpisode } from 'components/misc'
import { Button } from 'components/common'

export default function TvSeason(props) {
  const INITIAL_DATA_DISPLAY_COUNT = 5
  const { seasons, id } = props
  const [seasonNumber, setSeasonNumber] = useState(seasons[0].season_number)
  const [max, setMax] = useState(INITIAL_DATA_DISPLAY_COUNT)
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
    setMax(INITIAL_DATA_DISPLAY_COUNT)
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
        className='flex flex-col gap-y-3 mt-3 max-h-[575px] overflow-auto fancy-scroll sm:p-2'
        ref={scrollRef}
      >
        {!querySeason.isError && seasonDetails?.episodes?.slice(0, max).map((episode, index) => (
          <TvEpisode episode={episode} key={index} />
        ))}
        {Boolean(seasonDetails?.episodes?.length > INITIAL_DATA_DISPLAY_COUNT) && (
          <Button
            className='mx-auto min-w-max text-secondary hover:underline'
            title={
              max === INITIAL_DATA_DISPLAY_COUNT
                ? `View all episodes (${seasonDetails?.episodes?.length})`
                : 'Collapse'
            }
            onClick={
              max === INITIAL_DATA_DISPLAY_COUNT
                ? () => setMax(seasonDetails?.episodes?.length)
                : () => setMax(INITIAL_DATA_DISPLAY_COUNT)
            }
          />
        )}
      </div>
    </section>
  )
}

TvSeason.propTypes = {
  seasons: PropTypes.array,
  id: PropTypes.number,
}
