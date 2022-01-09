import {
  HeartIcon, PlayIcon, ShareIcon, StarIcon,
} from '@heroicons/react/solid'
import clsx from 'clsx'
import { Button } from 'components/common'
import { Fragment } from 'react'
import PropTypes from 'prop-types'

const buttonActions = [{
  title: 'Add to favorite',
  icon: <HeartIcon className='h-5 w-5 sm:ml-2' />,
  className: 'text-pink-400 hover:bg-pink-400 border-pink-400',
  smTitle: 'Favorite',
}, {
  title: 'Share movie',
  icon: <ShareIcon className='h-5 w-5 sm:ml-2' />,
  className: 'text-blue-400 hover:bg-blue-400 border-blue-400',
  smTitle: 'Share',
}, {
  title: 'Rate movie',
  icon: <StarIcon className='h-5 w-5 sm:ml-2' />,
  className: 'text-yellow-400 hover:bg-yellow-400 border-yellow-400',
  smTitle: 'Rate',
}]

export default function Actions({ showModal }) {
  return (
    <div className='mt-auto flex justify-between flex-wrap gap-2'>
      <Button
        className='bg-red-600 flex-center border border-red-600 p-2 rounded text-white hover:bg-opacity-80 transition-all'
        icon={<PlayIcon className='h-5 w-5 ml-2' />}
        title='Watch Trailer'
        onClick={showModal}
      />
      <div className='flex gap-x-2 text-sm justify-end'>
        {buttonActions.map(({
          title, icon, className,
        }) => (
          <Fragment key={title}>
            <Button
              className={clsx(
                'border hover:bg-opacity-10 sm:flex items-center justify-center p-2 transition-all rounded hidden',
                className,
              )}
              icon={icon}
              title={title}
            />
            <Button
              className={clsx(
                'border hover:bg-opacity-10 sm:hidden p-2 transition-all rounded-full flex-center',
                className,
              )}
              icon={icon}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

Actions.propTypes = {
  showModal: PropTypes.func,
}
