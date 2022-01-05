import PropTypes from 'prop-types'

export default function Button({
  title,
  icon,
  children,
  className,
  onClick,
}) {
  return (
    <button
      className={className}
      type='button'
      onClick={onClick}
    >
      {title}
      {icon}
      {children}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
