import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'
import createEmotionCache from '../lib/createEmotionCache'
import theme from '../theme/theme'

const clientSideEmotionCache = createEmotionCache()
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>FaceUmash みんなでつくるウマ娘ランキング</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta
          name='description'
          content='「faceUmash」は、ゲームを通してお気に入りのウマ娘を見つけることができるファンサイトです。ゲームの結果はウマ娘の人気ランキングとして反映されます。ゲームを楽しみながら、皆でウマ娘の人気ランキングを作成しましょう！'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
