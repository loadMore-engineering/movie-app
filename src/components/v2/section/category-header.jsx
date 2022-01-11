import { ChevronRightIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import Link from 'next/link'

export default function CategoryHeader({
  title,
  href,
}) {
  return (
    <div className='flex justify-between items-end w-full my-3'>
      <h3 className='sm:text-xl text-white'>{title}</h3>
      <Link href={href}>
        <a className='group font-bold text-third hover:underline'>
          View more
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
