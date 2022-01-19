import Document, {
  Html, Head, Main, NextScript,
} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' role='document'>
        <Head>
          <link href='/favicon.ico' rel='icon' />
          <link href='https://fonts.googleapis.com' rel='preconnect' />
          <link crossOrigin='true' href='https://fonts.gstatic.com' rel='preconnect' />
          <link href='https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=PT+Sans:wght@400;700&family=Poppins:wght@400;700&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
