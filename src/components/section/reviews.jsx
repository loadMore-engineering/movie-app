import PropTypes from 'prop-types'
import { ReviewCard } from 'components/misc'

export default function Reviews(props) {
  const { data = [] } = props

  return (
    <section className='bg-white bg-opacity-5 p-2 mt-3'>
      <h3 className='text-white text-xl border-b border-gray-600 p-2'>Reviews ({data.length})</h3>
      <div className='overflow-y-auto fancy-scroll max-h-[500px] p-2 mt-4 flex flex-col gap-y-3'>
        {data.map((review) => (
          <ReviewCard
            author={review.author}
            content={review.content}
            created_at={review.created_at}
            id={review.id}
            key={review.id}
          />
        ))}
        {!data.length && 'No Review found'}
      </div>
    </section>
  )
}

Reviews.propTypes = {
  data: PropTypes.array,
}
