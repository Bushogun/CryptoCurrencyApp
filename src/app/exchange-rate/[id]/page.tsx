'use client'
import React, { useEffect } from 'react';
import styles from '@/app/exchange-rate/[id]/exchage-rate-details.module.scss'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setError, setLoading, setSpecificCrypto } from '@/redux/features/crypto-slice';

const ExchangeRate = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestSpecificCrypto = process.env.NEXT_PUBLIC_REQUEST_SPECIFIC_CRYPTO!;
  const endPoint = `${apiUrl}${requestSpecificCrypto}/${id}`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setSpecificCrypto(data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError('Hubo un error en la conexión: ' + error));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, endPoint, id]);

  const specificCrypto = useAppSelector((state) =>
    state.currencyReducer.specificCrypto
  );

  return (
    <div className={styles.container_page}>
      <div className={styles.container_cards}>
        <div className={styles.basic_quote}>
          <div className={styles.name}>
            <h1>{specificCrypto?.name || 'N/A'}</h1>
            <h2>{specificCrypto?.symbol || 'N/A'}</h2>
          </div>
          <div className={styles.quote_status}>
            <p>Price USD: {specificCrypto?.price_usd || 'N/A'}</p>
            <p>Percent Change (24h): {specificCrypto?.percent_change_24h || 'N/A'}</p>
            <p>Percent Change (1h): {specificCrypto?.percent_change_1h || 'N/A'}</p>
            <p>Percent Change (7d): {specificCrypto?.percent_change_7d || 'N/A'}</p>
          </div>
        </div>
        <div className={styles.value}>
          <p>Market Cap USD: {specificCrypto?.market_cap_usd || 'N/A'}</p>
        </div>
        <div className={styles.supply}>
          <p><span>Current Supply: </span>{specificCrypto?.csupply || 'N/A'}</p>
          <p><span>Total Supply: </span>{specificCrypto?.tsupply || 'N/A'}</p>
          <p><span>Max Supply: </span>{specificCrypto?.msupply || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
