import PropTypes from 'prop-types'
import clsx from 'clsx'

export default function Chip({ text, size }) {
  return (
    <div className={clsx(
      size === 'sm' ? 'py-0.5' : 'py-1',
      'bg-secondary bg-opacity-10 text-secondary rounded flex-center px-2',
    )}
    >
      <span className={clsx(size === 'sm' ? 'text-[10px]' : 'text-xs')}>{text}</span>
    </div>
  )
}

Chip.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf([
    'default',
    'sm',
  ]),
}
