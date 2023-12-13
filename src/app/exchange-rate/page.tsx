'use client'
import React, { useEffect } from 'react';
import styles from '@/app/exchange-rate/exchange-rate.module.scss';
import CryptoCard from '@/app/components/crypto-card';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import  LoadingSpinner  from '@/app/components/loading-spinner/loading-spinner';
import { SearchBarForm } from '@/app/components/search-bar/search-bar-form';
import { setCryptos, setError, setLoading } from '@/redux/features/crypto-slice';
import { ICrypto } from '@/app/interfaces/i-crypto';
import { RootState } from '@/redux/store';

const ExchangeRate = () => {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector((state: RootState) => state.crypto.cryptos);
  const filterQuery = useAppSelector((state: RootState) => state.crypto.filterQuery);
  const loading = useAppSelector((state: RootState) => state.crypto.loading);
  const error = useAppSelector((state: RootState) => state.crypto.error);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos;

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCryptos(data));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError('There was an error in the connection: ' + error));
        dispatch(setLoading(true));
      });
    return () => {
      dispatch(setCryptos('')); 
    };
  }, []);

  const filteredCryptos = cryptos && cryptos.data
  ? cryptos.data.filter((crypto: ICrypto) => {
      return (
        crypto.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(filterQuery.toLowerCase())
      );
    })
  : [];

  return (
    <div className={styles.listContainer}>
      <>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={styles['container-page']}>
            <div className={styles['container-cards']}>
              <h1>Exchange Rate</h1>
              <div className={styles['container-search-bar']}>
                <SearchBarForm />
              </div>
                {filteredCryptos && filteredCryptos.length > 0 ? (
                  filteredCryptos.map((crypto: ICrypto) => (
                    <CryptoCard key={crypto.id} crypto={crypto} />
                  ))
                  ) : (
                  <p className={styles['not-found']}>Not found your search :(</p>
                  )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ExchangeRate;