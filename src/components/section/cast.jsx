/* eslint-disable react/no-array-index-key */
import useHorizontalScroll from 'hooks/useHorizontalScroll'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { CastCard } from 'components/misc'

export default function Cast(props) {
  const { casts } = props
  const scrollRef = useRef()
  const id = 'cast'
  const router = useRouter()

  useHorizontalScroll(id)

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: 0,
      behavior: 'auto',
    })
  }, [router.asPath])

  return (
    <section className='mt-8'>
      <h3 className='text-white text-xl my-4'>Actors ({casts.length})</h3>
      <div
        className='flex w-full overflow-x-auto gap-2 fancy-scroll my-1 text-xs sm:text-sm'
        id={id}
        ref={scrollRef}
      >
        {casts.map((cast, index) => (
          <CastCard
            character={cast.character}
            key={index}
            name={cast.name}
            profile_path={cast.profile_path}
          />
        ))}
      </div>
    </section>
  )
}

Cast.propTypes = {
  casts: PropTypes.array,
}
