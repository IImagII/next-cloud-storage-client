import { FileType } from './../api/file.service'
import { FileService } from '@/api/file.service'

//запрашиваем с бекенда список наших файлов
export async function fileRequest(type?: FileType) {
  try {
    // Получение значения типа из query, если оно существует, или использование значения FileType.All, если нет.
    const items = await FileService.getAll(type)

    return {
      props: { items }
    }
  } catch (err) {
    console.warn(err)
  }
  //если редиректа нет то возвращаемпустой пропс
  return {
    props: { items: [] }
  }
}
