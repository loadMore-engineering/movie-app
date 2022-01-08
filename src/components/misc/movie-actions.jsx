import { HeartIcon, ShareIcon, StarIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { Button } from 'components/common'
import { Fragment } from 'react/cjs/react.production.min'

const buttonActions = [{
  title: 'Add to favorite',
  icon: <HeartIcon className='h-5 w-5 ml-2' />,
  className: 'text-pink-400 hover:bg-pink-400 border-pink-400',
  smTitle: 'Favorite',
}, {
  title: 'Share movie',
  icon: <ShareIcon className='h-5 w-5 ml-2' />,
  className: 'text-blue-400 hover:bg-blue-400 border-blue-400',
  smTitle: 'Share',
}, {
  title: 'Rate movie',
  icon: <StarIcon className='h-5 w-5 ml-2' />,
  className: 'text-yellow-400 hover:bg-yellow-400 border-yellow-400',
  smTitle: 'Rate',
}]

export default function MovieActions() {
  return (
    <div className='mt-auto flex gap-x-2 text-sm'>
      {buttonActions.map(({
        title, icon, className, smTitle,
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
              'border hover:bg-opacity-10 sm:hidden p-2 transition-all rounded flex-center',
              className,
            )}
            icon={icon}
            title={smTitle}
          />
        </Fragment>
      ))}
    </div>
  )
}
