//типизируем входящие даннеы коотрые мы отправляем
export interface IAuthLoginForm {
  email: string
  password: string
}

//типизируем то что мы получаем отт сервера
export interface IAuthLoginResponse {
  token: string
}

//типизируем то что отправляем при регитсрации
export interface IAuthRegisterForm extends IAuthLoginForm {
  fullName: string
}

export interface IAuthRegisterResponse extends IAuthLoginResponse {}

export interface IUser {
  id: number
  email: string
  fullName: string
}
