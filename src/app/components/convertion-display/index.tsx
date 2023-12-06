import React from 'react'
import styles from './convertion-display.module.scss'

const ConvertionDisplay = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_display}>
          1 USD = 5000 COP
        </div>
      </div>
    </>
  )
}

export default ConvertionDisplay