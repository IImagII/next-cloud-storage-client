import { FC } from 'react'

import styles from '../../styles/Home.module.scss'
import MenuItem from '../ui/menu/MenuItem'
import UploadButton from '../upload/UploadButton'

const HomeLayout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <MenuItem />
      </div>

      <div className="container">{children}</div>
    </main>
  )
}

export default HomeLayout
