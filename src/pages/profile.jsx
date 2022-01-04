import Link from 'next/link'

export default function Profile() {
  return (
    <div>
      Profile
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  )
}
