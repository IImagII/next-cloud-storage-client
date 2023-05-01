import { destroyCookie } from 'nookies'

import axios from '../core/axios'

import { IFileItem } from './dto/file.interface'

export enum FileType {
  All = 'all',
  Photo = 'photos',
  Trash = 'trash'
}

const FILE = 'files'

export const FileService = {
  //метод для получения файлов
  async getAll(type: FileType = FileType.All) {
    const { data } = await axios.get<IFileItem[]>(`/${FILE}?type=${type}`)

    return data
  },

  //метод для удаления файлов
  async remove(ids: number[]) {
    console.log('🚀 ~ ids:', ids)
    const { data } = await axios.delete<void>(`/${FILE}?id=${ids}`)

    return data
  },

  //метод загрузки файлов
  async uploadFile(options: any) {
    const { onSuccess, onError, file, onProgress } = options // это опции самого компонента Uploads у него они встроены

    const formData = new FormData() // для того чтобы сформировать наши данные в один
    formData.append('file', file) //тут мы добаляем наши файлы

    //конфигуратор для самого axios
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },

      //вычисляем сколько было заружено во время отправки
      onProgress: (event: ProgressEvent) => {
        onProgress({ percent: (event.loaded / event.total) * 100 })
      }
    }
    try {
      const { data } = await axios.post(`${FILE}`, formData, config)

      onSuccess()

      return data
    } catch (err) {
      onError({ err })
    }
  }
}
