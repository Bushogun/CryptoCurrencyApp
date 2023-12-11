'use client'
import React, { useEffect } from 'react';
import styles from '@/app/exchange-rate/exchange-rate.module.scss';
import CryptoCard from '@/app/components/crypto-card';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { usePagination } from '@/app/components/pagination/pagination';
import Pagination from './list-pagination';
import LoadingSpinner from '@/app/components/loading-spinner/loading-spinner';
import { SearchBarForm } from '@/app/components/search-bar/search-bar-form';
import { setCryptos, setError, setLoading } from '@/redux/features/crypto-slice';
import { ICrypto } from '@/app/interfaces/i-crypto';

const ExchangeRate = () => {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector((state) => state.currencyReducer.cryptos?.data);
  const filterQuery = useAppSelector((state) => state.currencyReducer.filterQuery);
  const loading = useAppSelector((state) => state.currencyReducer.loading);
  const error = useAppSelector((state) => state.currencyReducer.error);
  const itemsPerPage = useAppSelector((state) => state.currencyReducer.itemsPerPage);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos;
  const allCryptos = cryptos || [];

  const filteredCryptos = allCryptos.filter((crypto: ICrypto) =>
    crypto.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const { currentPage, paginate, currentItems, totalPages } = usePagination(
    itemsPerPage,
    filteredCryptos
  );

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
              {currentItems().map((crypto: ICrypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ExchangeRate;
