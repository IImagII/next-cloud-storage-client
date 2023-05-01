import { Empty } from 'antd'
import { FC, useRef, useState } from 'react'

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

  const [selectedIds, setSelectedIds] = useState<number[]>([]) //состояние коотрое хранит соклько файлов мы выбрали мышкой

  const containerRef = useRef<HTMLDivElement>(null)
  //функция удаления файлов
  const onClickRemove = () => {
    setSelectedIds([])
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)))
    FileService.remove(selectedIds)
  }

  const onClickShare = () => {
    alert('share')
  }

  //функция коотрая отслеживает солкьо мы выбрали фалов мышкой
  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === FileSelectType.SELECT) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id))
    }
  }

  return (
    <div ref={containerRef}>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              isActive={selectedIds.length > 0}
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
            />
          )}
          <FileList
            items={files}
            onFileSelect={onFileSelect}
            containerRef={containerRef}
          />
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </div>
  )
}

export default Files
