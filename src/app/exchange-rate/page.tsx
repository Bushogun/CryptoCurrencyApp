'use client'
import React, { useEffect } from 'react'
import styles from '@/app/exchange-rate/exchange-rate.module.scss'
import CryptoCard from '@/app/components/crypto-card'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { SearchBarForm } from '@/app/components/search-bar/search-bar-form'
import { setCryptos, setError, setLoading } from '@/redux/features/crypto-slice';

const ExchangeRate = () => {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector((state) => state.currencyReducer.cryptos?.data);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos
  
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


  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <h1>Exchange Rate</h1>
        <div className={styles.container_search_bar}>
          <SearchBarForm />
        </div>
        
        <CryptoCard crypto={cryptos} />
      </div>
    </div>
  )
}

export default ExchangeRate