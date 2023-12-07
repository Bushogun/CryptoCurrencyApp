'use client'
import React from 'react';
import styles from '@/app/exchange-rate/[id]/exchage-rate-details.module.scss'

const ExchangeRate = () => {
  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <h1>Exchange Rate: "Bitcoin"</h1>
        <p>Symbol: "BTC"</p>
        <p>Price USD: 43258.07</p>
        <p>Percent Change (24h): "-1.69"</p>
        <p>Percent Change (1h): "0.09"</p>
        <p>Percent Change (7d): "14.74"</p>
        <p>Market Cap USD: "842275580342.92"</p>
        <p>Volume 24h:  26549447885.547035</p>
        <p>Current Supply: "19470946.00"</p>
        <p>Total Supply: "19470946"</p>
        <p>Max Supply: 21000000</p>
      </div>
    </div>
  );
};

export default ExchangeRate;


