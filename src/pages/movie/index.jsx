import Head from 'next/head'
import CategoryTabs from 'components/section/category-tabs'
import InfiniteScrollLayout from 'components/misc/infinite-scroll-layout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import Layout from 'components/layout'
import queryConfig from '../../queryConfig'

export default function Movie() {
  const { query: { category } } = useRouter()
  const [activeCategory, setActiveCategory] = useState(0)

  const movieCategory = queryConfig.slice(0, 2)
  const query = movieCategory[category] || queryConfig[0]

  useEffect(() => {
    setActiveCategory(movieCategory[category] ? +category : 0)
  }, [category, movieCategory])

  return (
    <div>
      <Head>
        <title>Loadmore - Movies</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main className='pt-[80px] px-2'>
        <CategoryTabs
          activeCategory={activeCategory}
          categories={movieCategory}
          setActiveCategory={setActiveCategory}
        />
        <section className='max-w-[1150px] mx-auto'>
          <InfiniteScrollLayout
            query={query}
          />
        </section>
      </main>
    </div>
  )
}

Movie.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)
