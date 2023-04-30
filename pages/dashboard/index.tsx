import { FileOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import Layout, { PageWithLayout } from '@/components/layout/Layout'
import UploadButton from '@/components/upload/UploadButton'

import { checkAuth } from '@/utils/checkAuth'

import styles from '../../styles/Home.module.scss'

//тут мы установили другой PageWithLayout для того тчобыподключить Layout специальный
const DashboardPage: PageWithLayout = () => {
  const router = useRouter()
  const selectedMenu = router.pathname // так мы храним путь на котором мы сейчас находимся

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: '/dashboard',
              icon: <FileOutlined />,
              label: 'Файлы',
              onClick: () => router.push('/dashboard')
            },
            {
              key: '/dashboard/photos',
              icon: <FileOutlined />,
              label: 'Фото',
              onClick: () => router.push('/dashboard/photos')
            },
            {
              key: '/dashboard/trash',
              icon: <FileOutlined />,
              label: 'Корзина',
              onClick: () => router.push('/dashboard/trash')
            }
          ]}
        />
      </div>

      <div className="container">
        <h1>Files</h1>
      </div>
    </main>
  )
}

//это позволяет обернуть страницу и при этом она будет рендерится не полностью
DashboardPage.getLayout = (page: ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>
}

//делаем запрос по SSR для выдачи на страницу
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  //тут мы сначало убедимся что пользоатель атворизирован
  const authProps = await checkAuth(ctx) //тут мы использовали свой хук который мы используем для атворизации

  //проверяем что если есть каконибуть редирект
  if ('redirect' in authProps) {
    return authProps //то мы отправляем пользователя на авотризацию
  }

  //если редиректа нет то возвращаемпустой пропс
  return {
    props: {}
  }
}

export default DashboardPage
