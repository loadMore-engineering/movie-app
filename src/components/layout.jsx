/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './common'

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
      <footer className='w-full min-h-[350px] bg-opacity-50 bg-black'>
        <div className='max-w-[1150px] mx-auto h-full flex items-center flex-col'>
          <div className='flex-center my-5'>
            <Image
              alt='Load More'
              className='object-cover'
              height={60}
              src='/loadmore_.png'
              width={60}
            />
            <h6 className='font-pt-sans text-4xl font-bold text-secondary'>LoadMore</h6>
          </div>
          <div className='h-full w-full flex-center flex-col sm:grid sm:grid-col-2 md:grid-cols-4 text-sm text-zinc-400'>
            <div className='flex flex-col'>
              <h6 className='text-secondary font-bold text-base'>SOCIAL</h6>
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Linkedin</span>
              <h6 className='text-secondary font-bold mt-6 text-base'>CONTACT US</h6>
              <span>+62 812 3456 7890</span>
              <span>loadmoree@gmail.com</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-secondary font-bold text-base'>INFORMATION</h6>
              <span>About Us</span>
              <span>More Search</span>
              <span>Blog</span>
              <span>Testimonials</span>
              <span>Events</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-secondary font-bold text-base'>Service</h6>
              <span>CTO as Service</span>
              <span>Tech Talk</span>
              <span>Development Service</span>
              <span>Maintenace</span>
              <span>Machine Learning</span>
              <span>Chat Bot</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-secondary font-bold text-base'>Community</h6>
              <span>Support</span>
              <span>Help</span>
              <span>Github</span>
              <h6 className='text-secondary font-bold mt-6 text-base'>Newsletter Subscription</h6>
              <div className='flex gap-2 items-center mt-2'>
                <input className='bg-white outline-none p-2 rounded text-black' type='email' />
                <Button
                  className='bg-secondary p-2 rounded text-white'
                  title='Submit'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='bg-black bg-opacity-60 w-full'>
          <div className='h-[50px] max-w-[1150px] mx-auto flex-center text-white'>
            LoadMore © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}
