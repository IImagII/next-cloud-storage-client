import { FC, useEffect, useRef } from 'react'
import Selecto from 'react-selecto'

import FileCard from '../file-card/FileCard'

import styles from './FileList.module.scss'
import { IFileItem } from '@/api/dto/file.interface'

export interface IFileList {
  items: IFileItem[]
  onFileSelect: (id: number, type: FileSelectType) => void
  containerRef: React.RefObject<HTMLDivElement>
}

export enum FileSelectType {
  SELECT = 'select',
  UNSELECT = 'unselect'
}

//компонент просто для отображения файлов
const FileList: FC<IFileList> = ({ items, onFileSelect, containerRef }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div key={item.id} data-id={item.id} className="file">
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}

      {/* функция коотрая будет следить я выделил файл или снял с него выделение */}
      <Selecto
        container={containerRef.current} // в рамках какого блокамы можем делать выделение
        selectableTargets={['.file']}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={['shift']}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add('active')
            onFileSelect(Number(el.dataset['id']), FileSelectType.SELECT)
          })
          e.removed.forEach((el) => {
            el.classList.remove('active')
            onFileSelect(Number(el.dataset['id']), FileSelectType.UNSELECT)
          })
        }}
      />
    </div>
  )
}

export default FileList
