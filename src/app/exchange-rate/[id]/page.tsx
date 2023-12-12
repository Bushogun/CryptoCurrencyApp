'use client'
import React, { useEffect } from 'react';
import styles from '@/app/exchange-rate/[id]/exchage-rate-details.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setError, setLoading, setSpecificCrypto } from '@/redux/features/crypto-slice'
import LoadingSpinner from '@/app/components/loading-spinner/loading-spinner';
import { RootState } from '@/redux/store';
  
  const ExchangeRate = (params: any) => {
  const dispatch = useAppDispatch();
  const specificCrypto = useAppSelector((state: RootState) => state.crypto.specificCrypto);
  const loading = useAppSelector((state: RootState) => state.crypto.loading);
  const error = useAppSelector((state: RootState) => state.crypto.error);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const requestSpecificCrypto = process.env.NEXT_PUBLIC_REQUEST_SPECIFIC_CRYPTO!;
    const endPoint = `${apiUrl}${requestSpecificCrypto}${params.params.id}`;
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const res = await fetch(endPoint);
        const data = await res.json();
        dispatch(setSpecificCrypto(data[0]));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError('We have a trouble with the conection ' + error));
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch, params.params.id]);


  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={styles['container-page']}>
          <div className={styles['container-cards']}>
            <div className={styles['basic-quote']}>
              <div className={styles.name}>
                <h1>{specificCrypto?.name || 'Is not avalible'}</h1>
                <h2>{specificCrypto?.symbol || 'Is not avalible'}</h2>
              </div>
              <div className={styles['quote-status']}>
                <p>Price USD: {specificCrypto?.price_usd || 'Is not avalible'}</p>
                <p> <small>Change 24h</small>: {specificCrypto?.percent_change_24h || 'Is not avalible'}%</p>
                <p> <small>Change 1h</small>: {specificCrypto?.percent_change_1h || 'Is not avalible'}%</p>
                <p> <small>Change 7d</small>: {specificCrypto?.percent_change_7d || 'Is not avalible'}%</p>
              </div>
            </div>
            <div className={styles.value}>
              <p>Market Cap USD: {specificCrypto?.market_cap_usd || 'Is not avalible'}</p>
            </div>
            <div className={styles.supply}>
              <p><span>Current Supply: <br/> </span>{specificCrypto?.csupply || ''}</p>
              <p><span>Total Supply: <br/> </span>{specificCrypto?.tsupply || ''}</p>
              <p><span>Max Supply: <br/> </span>{specificCrypto?.msupply || ''}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

};

export default ExchangeRate;
