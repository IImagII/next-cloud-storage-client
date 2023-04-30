import { destroyCookie } from 'nookies'

import axios from '../core/axios'

import {
  IAuthLoginForm,
  IAuthLoginResponse,
  IAuthRegisterForm,
  IAuthRegisterResponse,
  IUser
} from './dto/auth.interface'

const AUTH = 'auth'

export const AuthService = {
  //метод для авторизации
  async login(values: IAuthLoginForm) {
    const { data } = await axios.post<IAuthLoginResponse>(
      `/${AUTH}/login`,
      values
    )

    return data
  },

  //метод для регситрации
  async register(values: IAuthRegisterForm) {
    const { data } = await axios.post<IAuthRegisterResponse>(
      `/${AUTH}/register`,
      values
    )

    return data
  },

  //метод для редиректа пользователя если он не авторизован
  async getMe() {
    const { data } = await axios.get<IUser>(`/users/me`)

    return data
  },

  //создаем метод на выход пользователя
  //тут мы просто очищаем куки
  async logout() {
    destroyCookie(null, '_token', { path: '/' })
  }
}
