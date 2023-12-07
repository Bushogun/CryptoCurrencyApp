import React from 'react'
import styles from '@/app/exchange-rate/exchange-rate.module.scss'
import CryptoCard from '@/app/components/crypto-card'
import { SearchBarForm } from '@/app/components/search-bar/search-bar-form'

const ExchangeRate = () => {

  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <h1>Exchange Rate</h1>
        <div className={styles.container_search_bar}>
          <SearchBarForm />
        </div>
        <CryptoCard />
        <CryptoCard />
        <CryptoCard />
        <CryptoCard />
      </div>
    </div>
  )
}

export default ExchangeRate