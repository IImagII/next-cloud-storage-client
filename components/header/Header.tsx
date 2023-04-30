import { CloudOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Popover, Space } from 'antd'
import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './Header.module.scss'
import { AuthService } from '@/api/auth.service'

const Header: FC = () => {
  
  const router = useRouter()
  const selectedMenu = router.pathname // так мы храним путь на котором мы сейчас находимся

  //кнопка выйти
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      AuthService.logout()
      router.push('/')
    }
  }
  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            {/* тут иконка */}
            <CloudOutlined />
            Cloud Storage
          </h2>{' '}
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]} //тут мы передаем текущее положение для того чтобы компонент самм решал какоето посвечивать как активное
            onSelect={({ key }) => router.push(key)} //это тоже нужно для подсветки
            items={[
              { key: '/dashboard', label: 'Главная' },
              { key: '/dashboard/profile', label: 'Профиль' }
            ]}
          />
        </div>{' '}
        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button type="primary" danger onClick={onClickLogout}>
                Выйти
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  )
}

export default Header
