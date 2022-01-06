import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useDebouncedCallback } from 'use-debounce'
import useScrollToTop from 'hooks/useScrollToTop'
import { Button } from 'components/common'
import { Fragment } from 'react'
import { ChevronUpIcon } from '@heroicons/react/solid'

export default function InfiniteScrollLayout({ children, loadMore, totalData }) {
  const debounceLoadMore = useDebouncedCallback(() => loadMore(), 800)
  const { visible, scrollToTop } = useScrollToTop()

  return (
    <Fragment>
      <InfiniteScroll
        className='overflow-x-auto scroll-hidden gap-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'
        dataLength={totalData}
        endMessage={null}
        hasMore
        loader={null}
        next={debounceLoadMore}
        scrollThreshold={0.9}
      >
        {children}
      </InfiniteScroll>
      {visible && (
        <Button
          className='p-2 bg-primary bg-opacity-40 rounded-full hover:bg-opacity-30 transition-all fixed bottom-5 right-5 z-20'
          icon={<ChevronUpIcon className='h-7 w-7 text-primary' />}
          onClick={() => scrollToTop()}
        />
      )}
    </Fragment>
  )
}

InfiniteScrollLayout.propTypes = {
  children: PropTypes.any,
  loadMore: PropTypes.func,
  totalData: PropTypes.number,
}
