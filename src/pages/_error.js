import { useRouter } from 'next/router'
import { Button } from 'components/common'

export default function Custom500() {
  const { back } = useRouter()
  return (
    <div className='h-screen w-screen flex-center'>
      <span className='text-2xl text-center text-red-500'>An error has been occured!</span>
      <Button
        className='py-1.5 px-3 mt-3 rounded border border-red-500'
        title='Back to previous page'
        onClick={() => back()}
      />
    </div>
  )
}
