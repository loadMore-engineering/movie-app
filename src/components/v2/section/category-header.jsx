/* eslint-disable react/no-array-index-key */
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button } from 'components/common'
import clsx from 'clsx'

export default function CategoryHeader({
  title,
  href,
  showViewMore = true,
  pagination,
}) {
  const {
    goNext, goPrev, pageCount, currentPage, setPage,
  } = pagination
  return (
    <div className='flex justify-between items-center w-full my-3'>
      <h3 className='sm:text-xl text-white'>{title}</h3>
      {showViewMore && (
        <Link href={href}>
          <a className='group font-bold text-third hover:underline'>
            View more
            <ChevronRightIcon className='h-5 w-5 inline-flex slide-entrance' />
          </a>
        </Link>
      )}
      {pageCount > 1 && (
        <nav>
          <ul className='gap-2 hidden sm:flex'>
            {new Array(pageCount).fill('-').map((_, i) => (
              <li key={i}>
                <Button
                  className={clsx(
                    currentPage === i ? 'bg-secondary text-black' : 'text-secondary',
                    'h-[30px] w-[30px] border border-secondary rounded text-sm',
                  )}
                  title={i + 1}
                  onClick={() => setPage(i)}
                />
              </li>
            ))}
          </ul>
          <Button
            className='sm:hidden'
            disabled={currentPage === 0}
            icon={(
              <ArrowLeftIcon className={clsx(
                'h-5 w-5 mr-3',
                currentPage === 0 ? 'text-zinc-600' : 'text-secondary',
              )}
              />
            )}
            onClick={goPrev}
          />
          <Button
            className='sm:hidden'
            disabled={currentPage === pageCount - 1}
            icon={(
              <ArrowRightIcon className={clsx(
                'h-5 w-5 sm:hidden',
                currentPage === pageCount - 1 ? 'text-zinc-600' : 'text-secondary',
              )}
              />
            )}
            onClick={goNext}
          />
        </nav>
      )}
    </div>
  )
}

CategoryHeader.propTypes = {
  title: PropTypes.string,
  href: PropTypes.object,
  showViewMore: PropTypes.bool,
  pagination: PropTypes.object,
}
