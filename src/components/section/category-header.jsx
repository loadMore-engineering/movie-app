import { Button } from 'components/common'
import { ChevronRightIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import { useCallback } from 'react'

export default function CategoryHeader({ title, setActiveIndex, loadMore }) {
  const setIndex = useCallback(() => {
    loadMore()
    setActiveIndex()
  }, [setActiveIndex, loadMore])

  return (
    <div className='flex justify-between items-end w-full my-3 pl-3'>
      <span className='text-xl text-white'>{title}</span>
      <Button onClick={setIndex}>
        <span className='group font-bold text-primary hover:underline'>
          More
          <ChevronRightIcon className='h-5 w-5 inline-flex slide-entrance' />
        </span>
      </Button>
    </div>
  )
}

CategoryHeader.propTypes = {
  title: PropTypes.string,
  setActiveIndex: PropTypes.func,
  loadMore: PropTypes.func,
}
