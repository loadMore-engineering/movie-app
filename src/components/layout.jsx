/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'
import Footer from './section/footer'

export default function Layout({ children }) {
  return (
    <div className='relative min-h-screen'>
      <header className='w-full hidden md:block fixed top-0 left-0 h-[70px] bg-black bg-opacity-25 backdrop-blur z-30'>
        <div className='max-w-[1150px] mx-auto flex items-center h-full'>
          <Link href='/'>
            <a className='flex items-center'>
              <Image
                alt='Load More'
                className='object-cover'
                height={40}
                src='/loadmore.png'
                width={40}
              />
              <span className='text-yellow-400 font-bold text-2xl translate-x-2 translate-y-1 font-pt-sans'>LoadMore_ ✨</span>
            </a>
          </Link>
        </div>
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
