import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'

import axios from '../core/axios'

import { AuthService } from '@/api/auth.service'

//делаем запрос по SSR для выдачи на страницу
export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  //тут мы сначало убедимся что пользоатель атворизирован
  const { _token } = nookies.get(ctx)

  axios.defaults.headers.Authorization = 'Bearer ' + _token // тут из запросам мы получи сам токен

  try {
    await AuthService.getMe()

    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/dashboard/auth', // тут происходит редирект если не обраруживается токен
        permanent: false
      }
    }
  }
}
