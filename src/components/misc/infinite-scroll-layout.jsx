import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

export default function InfiniteScrollLayout({ children, loadMore, totalData }) {
  const delay = () => {
    setTimeout(() => {
      loadMore()
    }, 1500)
  }

  return (
    <InfiniteScroll
      className='overflow-x-auto scroll-hidden gap-x-4 gap-y-2 px-3 grid grid-cols-7'
      dataLength={totalData}
      endMessage={null}
      hasMore
      loader={null}
      next={delay}
    >
      {children}
    </InfiniteScroll>
  )
}

InfiniteScrollLayout.propTypes = {
  children: PropTypes.any,
  loadMore: PropTypes.func,
  totalData: PropTypes.number,
}
