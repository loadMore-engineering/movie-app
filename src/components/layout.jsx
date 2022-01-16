/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className='relative min-h-screen'>
      <header className='w-full hidden md:block fixed top-0 left-0 h-[70px] bg-black bg-opacity-25 backdrop-blur z-30'>
        <div className='max-w-[1150px] mx-auto flex items-center h-full'>
          <Link href='/'>
            <a className='flex items-end'>
              <Image
                alt='Load More'
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
      <main>
        {children}
      </main>
      <footer className='w-full h-[300px] bg-opacity-10 bg-white'>
        <div className='max-w-[1150px] mx-auto h-full flex items-center'>
          <div>
            <Image
              alt='Load More'
              className='object-cover'
              height={120}
              src='/loadmore_.png'
              width={120}
            />
          </div>
          <div className='h-full flex flex-col justify-center bg-pink-400'>
            <h6 className='font-pt-sans text-2xl font-bold'>LoadMore</h6>
            <p>We create high quality Apps for you, Load More is a developer and designer team who help you to build website, mobile apps, and graphic design.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
