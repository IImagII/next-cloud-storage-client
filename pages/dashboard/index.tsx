import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import FileActions from '@/components/file-actions/FileActions'
import FileList from '@/components/file-list/FileList'
import HomeLayout from '@/components/layout/HomeLayout'
import Layout, { PageWithLayout } from '@/components/layout/Layout'

import { checkAuth } from '@/utils/checkAuth'
import { fileRequest } from '@/utils/fileRequest'

import { IFileItem } from '@/api/dto/file.interface'
import Files from '@/modules/Files'

//тут мы типизировали наши пропсы коотрые мы получаем
interface Props {
  items: IFileItem[]
}

//тут мы установили другой PageWithLayout для того тчобыподключить Layout специальный
const DashboardPage: PageWithLayout<Props> = ({ items }) => {
  const router = useRouter()
  const selectedMenu = router.pathname // так мы храним путь на котором мы сейчас находимся

  return (
    <HomeLayout>
      <Files items={items} withActions />
    </HomeLayout>
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
  //запрос для нашей нами сорзданной функции для запроса конкретного типа файла
  return await fileRequest()
}

export default DashboardPage
