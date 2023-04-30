import type { AppProps } from 'next/app'
import NextProgressBar from 'nextjs-progressbar'
import { ReactElement, ReactNode } from 'react'

import '@/styles/globals.css'

interface Props extends AppProps {
  Component: AppProps['Component'] & {
    getLayout: (page: ReactElement) => ReactNode
  }
}

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page) //это нужно чтобы не перерисовывать каждый раз Layout

  return (
    <>
      <NextProgressBar
        color="#8690ec"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
