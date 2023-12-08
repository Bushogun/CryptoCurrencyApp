'use client'
import React from 'react';
import styles from '@/app/exchange-rate/[id]/exchage-rate-details.module.scss'

const ExchangeRate = () => {
  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <div className={styles.basic_quote}>
          <div className={styles.name}>
            <h1>BTC</h1>
            <h2>Bitcoin</h2>
          </div>
          <div className={styles.quote_status}>
            <p>Price USD: 43258.07</p>
            <p>Percent Change (24h): "-1.69"</p>
            <p>Percent Change (1h): "0.09"</p>
            <p>Percent Change (7d): "14.74"</p>
          </div>
        </div>
        <div className={styles.value}>
          <p>Market Cap USD: 842275580342.92</p>
        </div>
          <p>Volume 24h:  26549447885.547035</p>
        <div className={styles.supply}>
          <p><span>Current Supply: </span>19470946.00</p>
          <p><span>Total Supply: </span>19470946</p>
          <p><span>Max Supply: </span>21000000</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;


