/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getTVShowSeasons } from 'api/tvs'
import { useEffect, useState, useRef } from 'react'
import { TvEpisode } from 'components/misc'
import { Button } from 'components/common'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export default function TvSeason(props) {
  const INITIAL_DATA_DISPLAY_COUNT = 5
  const { seasons, id } = props
  const [seasonNumber, setSeasonNumber] = useState(seasons[0].season_number)
  const [max, setMax] = useState(INITIAL_DATA_DISPLAY_COUNT)
  const scrollRef = useRef()
  const router = useRouter()

  const querySeason = useQuery(['TV_SEASON'], () => getTVShowSeasons(id, seasonNumber), {
    onError: () => {
      if (seasonNumber === 1) {
        setSeasonNumber(0)
      } else {
        setSeasonNumber(1)
      }
    },
    retry: false,
  })
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
  }, [seasonNumber, router.query.id])

  const showViewAllButton = Boolean(seasonDetails?.episodes?.length > INITIAL_DATA_DISPLAY_COUNT)
    && max < seasonDetails?.episodes?.length

  return (
    <section className='bg-white bg-opacity-5 p-2 xl:pr-2 w-full mt-3'>
      <div className='flex justify-between items-center'>
        {querySeason.isError && (
          <div className='flex-center text-red-500 p-2.5'>
            An error occured!
          </div>
        )}
        {querySeason.isFetching && !querySeason.isError && <span className='p-2.5'>Loading..</span>}
        {!querySeason.isFetching && !querySeason.isError && <h3 className='text-sm sm:text-xl p-2'>Episodes ({seasonDetails?.episodes?.length})</h3>}
        <select
          className='w-[140px] mr-2 bg-transparent p-1 my-1 border border-gray-600 rounded text-white outline-none text-xs sm:text-base'
          disabled={querySeason.isFetching}
          value={seasonNumber}
          onChange={({ target }) => setSeasonNumber(target.value)}
        >
          {seasons.map((season, index) => (
            <option className='p-2 bg-[#191933]' key={index} value={season.season_number}>Season {index + 1}</option>
          ))}
        </select>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-y-3 mt-3 overflow-auto fancy-scroll sm:p-2',
          showViewAllButton ? 'max-h-[500px]' : 'max-h-[550px]',
        )}
        ref={scrollRef}
      >
        {!querySeason.isError && seasonDetails?.episodes?.slice(0, max).map((episode, index) => (
          <TvEpisode episode={episode} key={index} />
        ))}
      </div>
      {showViewAllButton && (
        <div className='py-1 pt-2 flex-center'>
          <Button
            className='text-white hover:bg-opacity-50 py-2 bg-secondary bg-opacity-70 w-full transition-all text-sm sm:text-base rounded'
            title={`View all episodes (${seasonDetails?.episodes?.length})`}
            onClick={() => setMax(seasonDetails?.episodes?.length)}
          />
        </div>
      )}
    </section>
  )
}

TvSeason.propTypes = {
  seasons: PropTypes.array,
  id: PropTypes.number,
}
