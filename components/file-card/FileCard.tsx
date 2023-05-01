import { FileTextOutlined } from '@ant-design/icons'
import { FC } from 'react'

import { getColorByExtension } from '@/utils/getColorByExtension'
import { getExtensionFromFile } from '@/utils/getExtensionFromFileName'

import { isImage } from '../../utils/isImage'

import styles from './FileCard.module.scss'

interface IFileCard {
  filename: string // то название что мы сгенерировали
  originalName: string // оригинальное название
}

//компонент для отображения файлов которы емы загрузили
const FileCard: FC<IFileCard> = ({ filename, originalName }) => {
  const ext = getExtensionFromFile(filename) //вытаскиваем расширение

  const imageUrl =
    ext && isImage(ext)
      ? `${process.env.NEXT_PUBLIC_URL}/uploads/${filename}`
      : '' //тут храниться путь к нашему изображению или пустую строку в зависимости от тогоявляется это изображением или нет

  const color = getColorByExtension(ext) // это для тго чтобы передавать конкретно цвет

  const classColor = styles[color]

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        {/* тут мы устанавливаем цвет в зависимости от расширения и переадем нашу переменную */}
        <i className={classColor}>{ext}</i>
        {/* тут формируем само изображение  или если это не изображение то иконку*/}
        {isImage(ext) ? (
          <img className={styles.image} src={imageUrl} />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName.slice(0, 30)}</span>
    </div>
  )
}

export default FileCard
