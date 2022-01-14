import Head from 'next/head'
import InfiniteScrollLayout from 'components/misc/infinite-scroll-layout'
import { useRouter } from 'next/router'
import { getSimilarTVShow } from 'api/tvs'

import Layout from 'components/layout'
import CategoryTabs from 'components/section/category-tabs'

export default function Similar() {
  const { query: { id } } = useRouter()

  return (
    <div>
      <Head>
        <title>Loadmore - TV Show</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='md:pt-[80px] px-2'>
        <CategoryTabs
          activeCategory={0}
          categories={[{
            title: 'Similar TV Show',
          }]}
          hideTabs
        />
        <section className='max-w-[1150px] mx-auto'>
          <InfiniteScrollLayout
            query={{
              queryFn: getSimilarTVShow,
              queryKey: 'TV_SIMILAR',
              cardHref: '/tv',
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
