import { useRouter } from 'next/router'
import { Button } from 'components/common'
import Head from 'next/head'
import { Fragment } from 'react'

export default function Custom500() {
  const { back } = useRouter()
  return (
    <Fragment>
      <Head>
        <title>Error - An error has been occured!</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <div className='h-screen w-screen flex-center text-red-500 flex-col'>
        <span className='text-2xl text-center'>An error has been occured!</span>
        <Button
          className='py-1.5 px-3 mt-3 rounded border border-red-500 block hover:bg-red-500 hover:bg-opacity-10 transition-all'
          title='Back to previous page'
          onClick={() => back()}
        />
      </div>
    </Fragment>
  )
}
