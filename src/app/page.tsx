'use client'
import React, { useState, useEffect } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '@/app/page.module.scss';
import CustomSelect from '@/app/components/custom-select';
import ConvertionDisplay from '@/app/components/convertion-display'
import { ICrypto } from '@/app/interfaces/i-crypto';


export default function Home() {
  const [cryptoData, setCryptoData] = useState<ICrypto>({
    data: [],
    info: {
      coins_num: 0,
      time: 0,
    },
  });

  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className={styles.container_page}>
      <div className={styles.container}>
        <h1>Currency converter</h1>
      </div>
      <div className={styles.container_selectors}>
        <h2>Currency I have</h2>
        <CustomSelect crypto={cryptoData} />
      </div>
      <div className={styles.container_selectors}>
        <h2>Currency I want</h2>
        <CustomSelect crypto={cryptoData} />
      </div>
      <div className={styles.container_buttons}>
        <button className={styles.button_convert}><FaArrowRightArrowLeft /> Convert</button>
      </div>
      <div className={styles.container}>
        <ConvertionDisplay />
      </div>

    </div>
  );
}
