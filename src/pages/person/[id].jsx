import Layout from 'components/layout'
import Head from 'next/head'
import PropTypes from 'prop-types'
import {
  getPerson, getPersonImages,
} from 'api/person'
import { PersonSummary } from 'components/section'
import { useRouter } from 'next/router'
import { FallbackMode } from 'components/common'

export default function Person(props) {
  const { data } = props
  const router = useRouter()

  const dataPerson = data?.[0]?.value
  const dataImages = data?.[1]?.value

  if (router.isFallback) {
    return <FallbackMode />
  }

  return (
    <div>
      <Head>
        <title>Loadmore - :v</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] pb-10'>
        {/* <div className='md:hidden'>
          <CarouselImage
            data={[movieDetails]}
            isInDetailPage
          />
        </div> */}
        <section className='max-w-[1150px] mx-auto py-3 text-white'>
          <PersonSummary
            personDetails={dataPerson}
          />
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const response = await Promise.allSettled([
    getPerson(id),
    getPersonImages(id),
  ])

  return {
    props: {
      data: response,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

Person.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

Person.propTypes = {
  data: PropTypes.array,
}
