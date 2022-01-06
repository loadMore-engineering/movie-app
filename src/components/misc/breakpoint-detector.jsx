export default function BreakpointDetector() {
  return (
    <div className='p-3 fixed top-10 right-10 bg-white'>
      <div className='sm:hidden'>xs</div>
      <div className='sm:block hidden'>sm</div>
      <div className='md:block hidden'>md</div>
      <div className='lg:block hidden'>lg</div>
      <div className='xl:block hidden'>xl</div>
      <div className='2xl:block hidden'>2xl</div>
    </div>
  )
}
