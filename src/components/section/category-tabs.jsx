import PropTypes from 'prop-types'
import { Button } from 'components/common'
import clsx from 'clsx'

export default function CategoryTabs({
  categories,
  setActiveIndex,
  activeIndex,
  clearQueryCache,
}) {
  return (
    <nav className='w-full sm:max-w-screen-xl mx-auto my-3 px-3'>
      <span className='text-3xl text-primary'>
        {categories[activeIndex].title}
      </span>
      <ul className='flex gap-2 sm:gap-3 my-2 text-xs sm:text-base flex-wrap'>
        {categories.map((category, index) => (
          <li key={category.title}>
            <Button
              className={clsx(
                activeIndex === index ? 'bg-primary text-black bg-opacity-100' : 'hover:bg-opacity-10 bg-opacity-0',
                'rounded border bg-primary border-primary py-1 px-3 text-primary transition-all',
              )}
              title={category.title}
              onClick={() => setActiveIndex(index)}
            />
          </li>
        ))}
        <li>
          <Button
            className='rounded border hover:bg-opacity-10 bg-opacity-0 bg-red-500 border-red-500 py-1 px-3 text-red-500 transition-all'
            title='Reset'
            onClick={() => {
              setActiveIndex(-1)
              clearQueryCache()
            }}
          />
        </li>
      </ul>
    </nav>
  )
}

CategoryTabs.propTypes = {
  categories: PropTypes.array,
  setActiveIndex: PropTypes.func,
  activeIndex: PropTypes.number,
  clearQueryCache: PropTypes.func,
}
