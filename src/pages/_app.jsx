/* eslint-disable jsx-a11y/alt-text */
import NProgress from 'nprogress'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Provider from '../Provider'
import 'nprogress/nprogress.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../styles/globals.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(
    <Provider>
      <img className='bg-image' src='/void-dark.svg' />
      <div className='w-full h-full fixed top-0 backdrop-blur-3xl z-[-1]' />
      <Component {...pageProps} />
    </Provider>,
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
}

export default MyApp
