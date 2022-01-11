import { XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Button from './button'

export default function Modal({ data, isModalVisible, closeModal }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const overlay = document.getElementById('overlay')
    overlay.classList.toggle('fade-in', isModalVisible)
    if (isModalVisible) {
      overlay.style.opacity = 1
      overlay.style.display = 'block'
      document.body.style.overflowY = 'hidden'
    }
  }, [isModalVisible])

  const onCloseModal = () => {
    const overlay = document.getElementById('overlay')
    overlay.classList.toggle('fade-out', !isModalVisible)
    overlay.style.opacity = 0
    setTimeout(() => {
      closeModal()
      overlay.style.display = 'none'
      setActiveIndex(0)
      document.body.style.overflowY = 'auto'
    }, 300)
  }

  console.log('DATA___', data)
  return (
    <div
      className='h-screen w-screen bg-black bg-opacity-75 fixed z-30 top-0 backdrop-blur-md opacity-0 transition-all duration-300 hidden'
      id='overlay'
    >
      <div className='relative w-full h-full'>
        {isModalVisible && (
          <section className='h-[275px] sm:h-[375px] md:h-[500px] bg-transparent max-w-screen-md mx-auto mt-[200px] sm:mt-[175px] relative rounded'>
            <nav className='flex gap-x-2 opacity-80 absolute -bottom-14 sm:-bottom-16 left-0 p-2 w-full overflow-x-auto fancy-scroll'>
              <div className='flex gap-x-2'>
                {data.map((video, index) => (
                  <Button
                    className={clsx(
                      activeIndex === index
                        ? 'bg-sky-400 text-white border-sky-400'
                        : 'border-white text-white',
                      'py-2 px-2 border rounded text-xs sm:text-sm whitespace-nowrap',
                    )}
                    key={video.key}
                    title={video.name}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </nav>
            <XIcon
              className='h-8 w-8 text-white cursor-pointer hover:text-red-400 transition-all duration-300 absolute -top-12 right-0'
              onClick={onCloseModal}
            />
            <iframe
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='w-full absolute bottom-0 left-0'
              frameBorder='0'
              height='100%'
              src={`https://www.youtube.com/embed/${data[activeIndex]?.key}`}
              title='Embedded youtube'
            />
          </section>
        )}
      </div>
    </div>
  )
}

Modal.propTypes = {
  data: PropTypes.array,
  isModalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
}
