'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/app/exchange-rate/exchange-rate.module.scss';
import CryptoCard from '@/app/components/crypto-card';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import  LoadingSpinner  from '@/app/components/loading-spinner/loading-spinner';
import { SearchBarForm } from '@/app/components/search-bar/search-bar-form';
import { setCryptos, setError, setLoading } from '@/redux/features/crypto-slice';
import { ICrypto } from '@/app/interfaces/i-crypto';
import { RootState } from '@/redux/store';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ExchangeRate = () => {
  const [start, setStart] = useState(0); 
  const [limit, setLimit] = useState(100); 
  const [coinsNum, setCoinsNum] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1);

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
    const fetchData = async () => {
      try {
        const response = await fetch(`${endPoint}?start=${start}&limit=${limit}`);
        const data = await response.json();
        dispatch(setCryptos(data));
        setCoinsNum(data.info.coins_num); 
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError('There was an error in the connection: ' + error));
        dispatch(setLoading(false));
      }
    };

    fetchData();

    return () => {
      dispatch(setCryptos(''));
    };
  }, [start, limit]);

  const filteredCryptos = cryptos && cryptos.data
  ? cryptos.data.filter((crypto: ICrypto) => {
      return (
        crypto.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(filterQuery.toLowerCase())
      );
    })
  : [];

  const handleNextPage = () => {
    if (start + limit < coinsNum) {
      setStart(start + limit);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (start - limit >= 0) {
      setStart(start - limit);
      setCurrentPage(currentPage - 1);
    }
  };

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
                  <div className={styles['container-buttons']}>
                    <button onClick={handlePrevPage} disabled={start === 0} >
                      <FaArrowAltCircleLeft />
                    </button>
                    <button onClick={handleNextPage} disabled={start + limit >= coinsNum}>
                      <FaArrowAltCircleRight />
                    </button>
                  </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ExchangeRate;