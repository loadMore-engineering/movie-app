import Head from 'next/head'
import CategoryTabs from 'components/section/category-tabs'
import InfiniteScrollLayout from 'components/misc/infinite-scroll-layout'

import Layout from 'components/layout'
import queryConfig from '../../queryConfig'

export default function Tv() {
  return (
    <div>
      <Head>
        <title>Loadmore - TV Show Popular</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='pt-[80px] px-2'>
        <CategoryTabs
          activeCategory={0}
          categories={[queryConfig[2]]}
          hideTabs
        />
        <section className='max-w-[1150px] mx-auto'>
          <InfiniteScrollLayout
            query={queryConfig[2]}
          />
        </section>
      </main>
    </div>
  )
}

Tv.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)
