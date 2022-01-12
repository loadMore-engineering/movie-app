/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div>
      <header className='w-full hidden md:block fixed top-0 left-0 h-[70px] bg-black bg-opacity-25 backdrop-blur z-30'>
        <div className='max-w-[1150px] mx-auto flex items-center h-full'>
          <Link href='/'>
            <a className='flex items-end'>
              <Image
                alt='Rebelworks'
                className='object-cover'
                height={40}
                src='/loadmore_.png'
                width={40}
              />
              <span className='text-white text-2xl translate-x-2 translate-y-1 font-pt-sans'>loadMore_ ✨</span>
            </a>
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
