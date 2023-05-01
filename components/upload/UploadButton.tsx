import { CloudUploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile, notification } from 'antd'
import { FC, useState } from 'react'

import styles from '../../styles/Home.module.scss'

import { FileService } from '@/api/file.service'

//компонент как нопка для загрузки файлов
const UploadButton: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]) // состояние коотрое будет хранить выдранные файлы

  //функция коотрая будет определять что файл был выьран и загружать его на сервер
  const onUploadSuccess = async (options: any) => {
    try {
      const file = await FileService.uploadFile(options) //запрос на отправку файлов

      setFileList([]) //это для очистки обратить внимание что передаем какбы путой массив тоесть то что содержалось по дефолту

      window.location.reload()
    } catch (err) {
      notification.error({
        message: 'Ошибка!',
        description: 'Не удалось загрузить файл',
        duration: 2
      })
    }
  }

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess} //отправка запроса на отправку файлов
      fileList={fileList} // это файл которые мы загржаем
      onChange={({ fileList }) => setFileList(fileList)} //добавляем файлы в сосотяние
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Загрузить файл
      </Button>
    </Upload>
  )
}

export default UploadButton
