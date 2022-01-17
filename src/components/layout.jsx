/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import Image from 'next/image'
import Link from 'next/link'
import { LocationMarkerIcon, PhoneIcon, MailIcon } from '@heroicons/react/solid'

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
      <footer className='w-full min-h-[625px] md:min-h-[450px] bg-opacity-50 bg-black'>
        <div className='max-w-[1150px] mx-auto h-full flex items-start flex-col pt-12'>
          <div className='flex items-center justify-start'>
            <Image
              alt='Load More'
              className='object-cover'
              height={60}
              src='/loadmore_.png'
              width={60}
            />
            <h6 className='font-pt-sans text-4xl font-bold text-secondary'>LoadMore</h6>
          </div>
          <div className='h-full w-full flex flex-col sm:grid sm:grid-col-2 md:grid-cols-5 text-sm text-zinc-400 gap-4'>
            <div className='px-3 text-sm col-span-2 flex flex-col'>
              <p className='text-zinc-400'>
                Bring your bussiness with digital experience & technology. We create Apps for your bussiness.
              </p>
              <p>Design - Prototyping - Develop - Testing - Magic happen</p>
              <h6 className='text-secondary font-bold text-base mt-5'>CONTACT US</h6>
              <span>
                <PhoneIcon className='w-4 h-4 inline mr-2' />
                <span>+62 812 3456 7890</span>
              </span>
              <span>
                <MailIcon className='w-4 h-4 inline mr-2' />
                <span>loadmoree@gmail.com</span>
              </span>
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
            </div>
          </div>
          {/* <div className='flex flex-col items-end w-full'>
            <h6 className='text-secondary font-bold mt-6 text-base'>Newsletter Subscription</h6>
            <div className='flex gap-2 items-center mt-2'>
              <input className='bg-white outline-none p-2 rounded text-black' type='email' />
              <Button
                className='bg-secondary p-2 rounded text-white'
                title='Submit'
              />
            </div>
          </div> */}
        </div>
        <div className='bg-black bg-opacity-60 w-full absolute bottom-0'>
          <div className='h-[120px] max-w-[1150px] mx-auto flex justify-between items-center text-white px-3'>
            <div className='text-sm'>
              <div className='flex gap-3 mb-2 text-secondary'>
                <h6>Terms & Condition</h6>
                <h6>∙</h6>
                <h6>Privacy Policy</h6>
                <h6>∙</h6>
                <h6>Support</h6>
              </div>
              <span className='block'>
                <LocationMarkerIcon className='w-4 h-4 inline mr-1 text-red-500' />
                <span className='text-xs'>No where</span>
              </span>
              <p className='text-xs mt-2'>© {new Date().getFullYear()} LoadMore A&K</p>
            </div>
            <div className='text-sm'>
              <span>Follow Us:</span>
              <div className='flex-center gap-2 mt-1'>
                <img
                  alt='facebook'
                  height={25}
                  src='/social/facebook-min.png'
                  width={25}
                />
                <img
                  alt='instagram'
                  height={25}
                  src='/social/instagram-min.png'
                  width={25}
                />
                <img
                  alt='linkedin'
                  height={25}
                  src='/social/linkedin-min.png'
                  width={25}
                />
                <img
                  alt='youtube'
                  height={25}
                  src='/social/youtube-min.png'
                  width={25}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
