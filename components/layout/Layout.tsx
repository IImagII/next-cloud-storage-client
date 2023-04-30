import { NextPage } from 'next'
import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { ReactElement, ReactNode } from 'react'

import styles from '../../styles/Home.module.scss'
import Header from '../header/Header'

interface ILayout {
  title: string
}

//этот ти нужен для расширения типизации и добавления DashboardPage.getLayout чтобы грузилась только чать страницы а остальная оставалась неизменной
export type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
      </main>
      <div className={styles.main}>
        <div className={styles.layout}>{children}</div>
      </div>
    </>
  )
}

export default Layout
