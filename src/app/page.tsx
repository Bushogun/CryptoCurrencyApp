'use client'
import React, { useEffect } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '@/app/page.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import CustomSelect from '@/app/components/custom-select';
import ConvertionDisplay from '@/app/components/convertion-display'
import { setCryptos, setLoading, setError } from '@/redux/features/crypto-slice';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCryptos(data));
        dispatch(setLoading(false));
      })
      .catch((error) =>
        dispatch(setError('Hubo un error en la conexión' + error), setLoading(false))
      );
  }, []);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos+'?start=1&limit=5';
  const cryptos = useAppSelector((state) => state.currencyReducer.cryptos?.data);

  return (
    <div className={styles.container_page}>
      <div className={styles.container}>
        <h1>Currency converter</h1>
      </div>
      <div className={styles.container_selectors}>
          <h2>Currency I have</h2>
          <CustomSelect crypto={cryptos} type="currencyIHave"/>
        </div>
        <div className={styles.container_selectors}>
          <h2>Currency I want</h2>
          <CustomSelect crypto={cryptos} type="currencyIWant"/>
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
