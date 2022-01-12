import PropTypes from 'prop-types'
import { Button } from 'components/common'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function CategoryTabs({
  categories,
  setActiveCategory,
  activeCategory,
  hideTabs,
}) {
  const { push } = useRouter()

  const changeCategory = (index) => {
    setActiveCategory(index)
    push(`${categories[index].indexHref}?category=${index}`)
  }

  return (
    <nav className='w-full sm:max-w-[1150px] mx-auto my-3'>
      <span className='flex text-third items-center'>
        <Link href='/'>
          <a>
            <Button
              className='p-1 bg-third bg-opacity-40 rounded hover:bg-opacity-30 transition-all'
              icon={<HomeIcon className='h-5 w-5 text-third' />}
            />
          </a>
        </Link>
        <h1 className='text-2xl md:text-4xl text-third ml-3'>
          {categories[activeCategory].title}
        </h1>
      </span>
      {!hideTabs && (
        <ul className='flex gap-2 sm:gap-3 my-2 text-xs sm:text-base flex-wrap'>
          {categories.map((category, index) => (
            <li key={category.title}>
              <Button
                className={clsx(
                  activeCategory === index
                    ? 'bg-third text-third bg-opacity-20 border-third opacity-100'
                    : 'hover:bg-opacity-10 bg-opacity-0 border-white text-white opacity-50',
                  'rounded border bg-white py-0.5 px-2 text-sm transition-all',
                )}
                title={category.title}
                onClick={() => changeCategory(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

CategoryTabs.propTypes = {
  categories: PropTypes.array,
  setActiveCategory: PropTypes.func,
  activeCategory: PropTypes.number,
  hideTabs: PropTypes.bool,
}
