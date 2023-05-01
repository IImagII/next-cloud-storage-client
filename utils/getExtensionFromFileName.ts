import { Extension } from './getColorByExtension'

//фукнция которая из названия вытащит расширение файла
export const getExtensionFromFile = (filename: string) => {
  return filename.split('.').pop() as Extension
}
