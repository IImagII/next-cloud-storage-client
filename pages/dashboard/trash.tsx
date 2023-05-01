import { FileOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import FileList from '@/components/file-list/FileList'
import HomeLayout from '@/components/layout/HomeLayout'
import Layout, { PageWithLayout } from '@/components/layout/Layout'
import MenuItem from '@/components/ui/menu/MenuItem'
import UploadButton from '@/components/upload/UploadButton'

import { checkAuth } from '@/utils/checkAuth'
import { fileRequest } from '@/utils/fileRequest'

import styles from '../../styles/Home.module.scss'

import { IFileItem } from '@/api/dto/file.interface'
import { FileService, FileType } from '@/api/file.service'
import Files from '@/modules/Files'

//тут мы типизировали наши пропсы коотрые мы получаем
interface Props {
  items: IFileItem[]
}

//тут мы установили другой PageWithLayout для того тчобыподключить Layout специальный
const TrashPage: PageWithLayout<Props> = ({ items }) => {
  const router = useRouter()
  const selectedMenu = router.pathname // так мы храним путь на котором мы сейчас находимся

  return (
    <HomeLayout>
      <Files items={items} />
    </HomeLayout>
  )
}

//это позволяет обернуть страницу и при этом она будет рендерится не полностью
TrashPage.getLayout = (page: ReactNode) => {
  return <Layout title="Dashboard / Корзина">{page}</Layout>
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
  return await fileRequest(FileType.Trash)
}

export default TrashPage
