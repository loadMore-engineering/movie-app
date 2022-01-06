import { ChevronRightIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function CategoryHeader({
  title,
  href,
}) {
  return (
    <div className='flex justify-between items-end w-full my-3'>
      <span className='text-xl text-white'>{title}</span>
      <Link href={href}>
        <a className='group font-bold text-primary hover:underline'>
          More Movie
          <ChevronRightIcon className='h-5 w-5 inline-flex slide-entrance' />
        </a>
      </Link>
    </div>
  )
}

CategoryHeader.propTypes = {
  title: PropTypes.string,
  href: PropTypes.object,
}
