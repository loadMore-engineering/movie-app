import { useRouter } from 'next/router'
import { Button } from 'components/common'

export default function Custom404() {
  const { back } = useRouter()
  return (
    <div className='h-screen w-screen flex-center text-red-500 flex-col'>
      <span className='text-2xl text-center'>The page you looking for is do not exist!</span>
      <Button
        className='py-1.5 px-3 mt-3 rounded border border-red-500 block hover:bg-red-500 hover:bg-opacity-10 transition-all'
        title='Back to previous page'
        onClick={() => back()}
      />
    </div>
  )
}
