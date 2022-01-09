/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div>
      <header className='w-full hidden md:block fixed top-0 left-0 h-[70px] bg-black bg-opacity-25 backdrop-blur-lg z-30'>
        <div className='max-w-screen-xl mx-auto flex items-center h-full'>
          <Link href='/'>
            <a>
              <Image
                alt='Rebelworks'
                height={40}
                src='/rebelworks.png'
                width={40}
              />
            </a>
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
