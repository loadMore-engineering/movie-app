import PropTypes from 'prop-types'
import Link from 'next/link'

export default function ButtonLink({ children, href }) {
  return (
    <button type='button'>
      <Link href={href}>
        <a>
          {children}
        </a>
      </Link>
    </button>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
}
