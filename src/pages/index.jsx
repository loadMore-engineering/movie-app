import Head from 'next/head'
import { CarouselImage, Showcase } from 'components/section'
import { useState } from 'react'
import queryConfig from '../queryConfig'

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(-1)

  return (
    <div>
      <Head>
        <title>RebelWorks Mini Project</title>
        <meta content='Movie Apps Prototype integrated with TMDB API' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      <main>
        <CarouselImage />
        {queryConfig.map((category, index) => (
          <Showcase
            activeIndex={activeIndex}
            categories={queryConfig}
            key={category.title}
            selfIndex={index}
            setActiveIndex={setActiveIndex}
            {...category}
          />
        ))}
      </main>
    </div>
  )
}
