import { FileOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from '../../../styles/Home.module.scss'

const MenuItem: FC = () => {
  const router = useRouter()
  const selectedMenu = router.pathname // так мы храним путь на котором мы сейчас находимся

  return (
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
  )
}

export default MenuItem
