import axios from 'axios'
import { parseCookies } from 'nookies'

// parseCookies-тут мы это применили для вытягиванию токена

//запрос по умолчанию
axios.defaults.baseURL = 'http://localhost:7777'

/**необходимо сделать так чтобы axios проверял каждый раз когда
 * делал запрос есть ли у пользователя токен */

axios.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const { _token } = parseCookies()

    config.headers.Authorization = 'Bearer ' + _token
  }

  return config
})

export default axios
/**Этот код добавляет интерцептор запроса в библиотеку Axios, которая используется
 * для выполнения HTTP-запросов в браузере или на сервере. Интерцептор запроса позволяет 
 * перехватить все исходящие запросы и изменить их перед отправкой.

В данном случае, при каждом исходящем запросе, этот интерцептор проверяет, существует ли 
объект window, что говорит о том, что код выполняется в браузере, а не на сервере. Если 
объект window существует, он получает токен доступа из cookies с помощью функции 
parseCookies() и добавляет его в заголовок Authorization с префиксом 'Bearer '.

В конце, код экспортирует объект Axios с добавленным интерцептором запроса. Теперь 
при каждом выполнении запроса с помощью Axios, токен автоматически добавляется в 
заголовок запроса. Это может быть полезно, например, для авторизации пользователей 
на сервере. */