import { Button, Form, Input, notification } from 'antd'
import { setCookie } from 'nookies'
import { FC } from 'react'

import styles from './LoginForm.module.scss'
import { AuthService } from '@/api/auth.service'
import { IAuthRegisterForm } from '@/api/dto/auth.interface'

const RegisterForm: FC = () => {
  const onSubmit = async (values: IAuthRegisterForm) => {
    try {
      const { token } = await AuthService.register(values)

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
      location.href = '/dashboard'
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
      <h3>Регистрация</h3>
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
          label="Полное имя"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Укажите полное имя'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterForm
