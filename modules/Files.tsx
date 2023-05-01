import { Empty } from 'antd'
import { FC, useState } from 'react'

import FileActions from '@/components/file-actions/FileActions'
import FileList, { FileSelectType } from '@/components/file-list/FileList'

import { IFileItem } from '@/api/dto/file.interface'
import { FileService } from '@/api/file.service'

interface IFiles {
  items: IFileItem[]
  withActions?: boolean
}

//компонент который показывает что список фалов пуст ну и просто отображает файлы при этом делает различные проверки
//он в себя вмешает несколько компонентом поэтому и module
const Files: FC<IFiles> = ({ items, withActions }) => {
  const [files, setFiles] = useState(items || [])

  const [selectedIds, setSelectedIds] = useState<number>(0) //состояние коотрое хранит соклько файлов мы выбрали мышкой
  console.log('🚀 ~ selectedIds:', selectedIds)

  //функция удаления файлов
  const onClickRemove = (id) => {
    setSelectedIds(0)
    setFiles((prev) => prev.filter((file) => file.id !== id)) //тут удаялем файл из нашего состояния
    FileService.remove(selectedIds)
    window.location.reload()
  }

  const onClickShare = () => {
    alert('share')
  }

  //функция коотрая отслеживает солкьо мы выбрали фалов мышкой
  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === FileSelectType.SELECT) {
      setSelectedIds(id)
    } else {
      // setSelectedIds((prev) => prev.filter((_id) => _id !== id))
    }
  }

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              isActive
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  )
}

export default Files
