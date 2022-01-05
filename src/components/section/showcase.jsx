import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { ButtonLink, Photo } from 'components/common'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import { CardMeta } from '.'

export default function Showcase({
  title,
  queryFn,
  queryKey,
  detailHref,
}) {
  const id = queryKey.toLowerCase()
  const movie = useQuery([queryKey, { page: 1 }], queryFn)
  const data = movie.data?.results || []

  useEffect(() => {
    const slider = document.getElementById(id)
    const functionListener = (evt) => {
      evt.preventDefault()
      slider.scrollLeft += evt.deltaY
    }
    slider.addEventListener('wheel', functionListener)
    return () => {
      slider.removeEventListener('wheel', functionListener)
    }
  }, [id])

  return (
    <section className='w-full sm:max-w-screen-xl mx-auto mb-10'>
      <div className='flex justify-between items-end w-full my-3 pl-3'>
        <span className='text-xl text-white'>{title}</span>
        <ButtonLink href={detailHref}>
          <span className='group font-bold text-primary hover:underline'>
            See All
            <ChevronRightIcon className='h-5 w-5 inline-flex opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all' />
          </span>
        </ButtonLink>
      </div>
      <div className='flex overflow-x-auto gap-x-2 px-3 scroll-hidden' id={id}>
        {data.map((item) => (
          <div className='relative group overflow-hidden min-w-[175px]' key={item.id}>
            <div className='absolute poster-overlay h-[250px] w-[175px] z-10' />
            <div className='relative h-[250px] group-hover:scale-110 transition-transform'>
              <Photo
                alt={item.original_name || item.title}
                priority={false}
                size='/w342'
                src={item.poster_path}
              />
            </div>
            <CardMeta
              genres={item.genre_ids}
              overview={item.overview}
              rating={item.vote_average}
              title={item.original_name || item.title}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

Showcase.propTypes = {
  title: PropTypes.string.isRequired,
  queryFn: PropTypes.func.isRequired,
  queryKey: PropTypes.string.isRequired,
  detailHref: PropTypes.string.isRequired,
}
