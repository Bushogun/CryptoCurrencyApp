import React from 'react'
import styles from './exchange-rate.module.scss'
import CryptoCard from '@/app/components/crypto-card'

const ExchangeRate = () => {

  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <h1>Exchange Rate</h1>
        <CryptoCard />
      </div>
    </div>
    )
}

export default ExchangeRate