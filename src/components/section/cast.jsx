/* eslint-disable react/no-array-index-key */
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import PropTypes from 'prop-types'
import {
  useEffect, useRef, useMemo, useState,
} from 'react'
import { useRouter } from 'next/router'
import { CastCard } from 'components/misc'
import { Button } from 'components/common'
import { ArrowRightIcon } from '@heroicons/react/solid'

export default function Cast(props) {
  const INITIAL_DISPLAYED_DATA = 10
  const [isShowedAll, setIsShowedAll] = useState(false)
  const { casts } = props
  const scrollRef = useRef()
  const id = 'cast'
  const router = useRouter()

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: 0,
      behavior: 'auto',
    })
  }, [router.asPath])

  const displayedData = useMemo(
    () => casts.slice(0, isShowedAll ? casts.length : INITIAL_DISPLAYED_DATA),
    [casts, isShowedAll],
  )

  const showViewMoreButton = !isShowedAll && casts.length > INITIAL_DISPLAYED_DATA
  useHorizontalScroll(id, displayedData.length)

  return (
    <section className='mt-8'>
      <h3 className='text-white sm:text-xl my-4'>Actors ({casts.length})</h3>
      <div
        className='flex w-full overflow-x-auto gap-2 fancy-scroll my-1 text-xs sm:text-sm'
        id={id}
        ref={scrollRef}
      >
        {displayedData.map((cast, index) => (
          <CastCard
            character={cast.character}
            key={index}
            name={cast.name}
            profile_path={cast.profile_path}
          />
        ))}
        {showViewMoreButton && (
          <div className='flex-center text-secondary bg-white bg-opacity-10 min-w-[100px] sm:min-w-[120px] h-[120px] sm:h-[170px] rounded'>
            <Button
              className='hover:underline'
              icon={<ArrowRightIcon className='h-4 w-4 ml-1 inline' />}
              title='View more'
              onClick={() => setIsShowedAll(true)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

Cast.propTypes = {
  casts: PropTypes.array,
}
