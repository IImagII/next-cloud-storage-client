import { Button } from 'antd'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout, { PageWithLayout } from '@/components/layout/Layout'

import { checkAuth } from '@/utils/checkAuth'

import styles from '../../styles/Profile.module.scss'

import { AuthService } from '@/api/auth.service'
import { IUser } from '@/api/dto/auth.interface'

interface Props {
  userData: IUser
}

const ProfilePage: PageWithLayout<Props> = ({ userData }) => {
  const router = useRouter()

  //кнопка выйти
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      AuthService.logout()
      router.push('/')
    }
  }
  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button onClick={onClickLogout} type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  )
}

ProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>
}

//делаем запрос по SSR для выдачи на страницу это мы делаем для того чтобы у насбыл редирект если пользователь не авторизирован
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  //тут мы сначало убедимся что пользоатель атворизирован
  const authProps = await checkAuth(ctx) //тут мы использовали свой хук который мы используем для атворизации

  //проверяем что если есть каконибуть редирект
  if ('redirect' in authProps) {
    return authProps //то мы отправляем пользователя на авотризацию
  }

  //и после этого если мы авотризованы берем информацию о пользователе
  const userData = await AuthService.getMe()
  //если редиректа нет то возвращаемпустой пропс
  return {
    props: { userData }
  }
}

export default ProfilePage
