import { Button, Popconfirm } from 'antd'
import { FC } from 'react'

import styles from './FileActions.module.scss'

interface IFileActions {
  onClickRemove?: VoidFunction
  onClickShare?: VoidFunction
  isActive: boolean
}

const FileActions: FC<IFileActions> = ({
  onClickRemove,
  onClickShare,
  isActive
}) => {
  return (
    <div className={styles.root}>
      <Button onClick={onClickShare} disabled={!isActive}>
        Поделиться
      </Button>

      <Popconfirm
        title="Удалить файл(ы)?"
        description="Все файлы будут перемещены в корзину"
        okText="Да"
        cancelText="Нет"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button
          onClick={onClickRemove}
          disabled={!isActive}
          type="primary"
          danger
        >
          Удалить
        </Button>
      </Popconfirm>
    </div>
  )
}

export default FileActions
