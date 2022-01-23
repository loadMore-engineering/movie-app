import PropTypes from 'prop-types'

export default function Button({
  title,
  icon,
  children,
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={className}
      disabled={disabled}
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  icon: PropTypes.node,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}
