import Head from 'next/head'
import InfiniteScrollLayout from 'components/misc/infinite-scroll-layout'
import { useRouter } from 'next/router'
import { getMovieCredits, getPerson } from 'api/person'

import Layout from 'components/layout'
import CategoryTabs from 'components/section/category-tabs'

export default function Similar(props) {
  const { query: { id } } = useRouter()
  const { data } = props

  return (
    <div>
      <Head>
        <title>Loadmore - Movies</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] px-2'>
        <CategoryTabs
          activeCategory={0}
          categories={[{
            title: 'Similar Movie',
          }]}
          hideTabs
        />
        <section className='max-w-[1150px] mx-auto'>
          <InfiniteScrollLayout
            query={{
              queryFn: getMovieCredits,
              queryKey: 'MOVIE_SIMILAR',
              cardHref: '/movie',
              id,
            }}
          />
        </section>
      </main>
    </div>
  )
}

Similar.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

export async function getStaticProps({ params }) {
  const { id } = params
  const response = await getPerson(id)

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
