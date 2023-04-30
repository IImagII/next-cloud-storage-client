import { Button, Form, Input, notification } from 'antd'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import React from 'react'

import styles from './LoginForm.module.scss'
import { AuthService } from '@/api/auth.service'
import { IAuthLoginForm } from '@/api/dto/auth.interface'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  //кнопка для получения полей и отправки на сервер
  const onSubmit = async (values: IAuthLoginForm) => {
    try {
      const { token } = await AuthService.login(values)

      //notification - оповещение о том что мы авторизовались
      notification.success({
        message: 'Успешно!',
        description: 'Переходим в админ-панель...',
        duration: 2
      })

      //сохраняем наш токен в cookies чтобы пользоваться им
      setCookie(null, '_token', token, {
        path: '/'
      })
      router.push('/dashboard') //перенаправление на страницу
    } catch (err) {
      console.warn('LoginForm', err)

      //выводим ошибку через библиотеку antd используя notification
      notification.error({
        message: 'Ошибка!',
        description: 'Неверный логин или пароль',
        duration: 2
      })
    }
  }

  return (
    <div className={styles.formBlock}>
      <h3>Автризация</h3>
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Укажите почту'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Укажите пароль'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
