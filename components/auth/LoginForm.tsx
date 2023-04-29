import { Button, Form, Input } from 'antd'
import { FC } from 'react'

import styles from './LoginForm.module.scss'

const LoginForm: FC = () => {
  //кнопка для получения полей
  const onSubmit = (values: any) => {
    console.log('🚀 ~ values:', values)
  }
  return (
    <div className={styles.formBlock}>
      <Form name="basic" labelCol={{ span: 8 }} onFinish={onSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Укажите email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Укажите password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
