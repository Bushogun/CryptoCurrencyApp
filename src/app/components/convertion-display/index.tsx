import React from 'react'
import styles from '@/app/components/convertion-display/convertion-display.module.scss'

const ConvertionDisplay = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_display}>
          <h3>1 USD =  <span>5000 COP</span></h3>
        </div>
      </div>
    </>
  )
}

export default ConvertionDisplay