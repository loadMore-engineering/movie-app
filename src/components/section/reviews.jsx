import PropTypes from 'prop-types'
import { ReviewCard } from 'components/misc'
import { QuestionMarkCircleIcon } from '@heroicons/react/solid'

export default function Reviews(props) {
  const { data = [] } = props

  return (
    <section className='bg-white bg-opacity-5 p-2 mt-3'>
      <h3 className='text-white text-sm sm:text-xl border-b border-gray-600 p-2'>Reviews ({data.length})</h3>
      <div className='overflow-y-auto fancy-scroll max-h-[500px] sm:min-h-[200px] p-2 mt-4 flex flex-col gap-y-3'>
        {data.map((review) => (
          <ReviewCard
            author={review.author}
            content={review.content}
            created_at={review.created_at}
            id={review.id}
            key={review.id}
          />
        ))}
        {!data.length && (
          <div className='min-h-[200px] flex-center flex-col gap-y-2 text-white opacity-50'>
            <QuestionMarkCircleIcon className='w-10 h-10 inline' />
            <span>No Review found</span>
          </div>
        )}
      </div>
    </section>
  )
}

Reviews.propTypes = {
  data: PropTypes.array,
}
