'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '@/app/page.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import CustomSelect from '@/app/components/custom-select';
import ConvertionDisplay from '@/app/components/convertion-display'
import { setCryptos, setLoading, setError } from '@/redux/features/crypto-slice';
import { RootState } from '@/redux/store';

interface ConversionData {
  currencyIHave: string;
  currencyIWant: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [conversionData, setConversionData] = useState<ConversionData>({ currencyIHave: '', currencyIWant: '' });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos;
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);
  const cryptoIHave = useAppSelector((state: RootState) => state.crypto.currencyIHave);
  const cryptoIWant = useAppSelector((state: RootState) => state.crypto.currencyIWant);

  useEffect(() => {
    if (!cryptos) {
      dispatch(setLoading(true));
      fetch(endPoint)
        .then((response) => response.json())  
        .then((data) => {
          dispatch(setCryptos(data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setError('There was an error in the connection: ' + error));
          dispatch(setLoading(false));
        });
    }
  }, [cryptos, dispatch, endPoint]);
  

  function calculateConversionRate(cryptoFrom: string, cryptoTo: string, cryptosData: any[]) {
    dispatch(setLoading(true));
    const fromCrypto = cryptosData.find((crypto) => crypto.name === cryptoFrom);
    const toCrypto = cryptosData.find((crypto) => crypto.name === cryptoTo);

    if (!fromCrypto || !toCrypto) {
      dispatch(setError('One or both cryptocurrencies were not found in the data.'));
      return null;
    }
  
    const fromPriceUSD = parseFloat(fromCrypto.price_usd);
    const toPriceUSD = parseFloat(toCrypto.price_usd);
  
    if (isNaN(fromPriceUSD) || isNaN(toPriceUSD)) {
      dispatch(setError('Error converting price to number.'));
      return null;
    }
  
    const conversionRate = fromPriceUSD / toPriceUSD;
    dispatch(setLoading(false));
    return conversionRate;
  }

  const handleConversion = () => {
    if (cryptoIHave && cryptoIWant && cryptos) {
      const rate = calculateConversionRate(cryptoIHave, cryptoIWant, cryptos.data);
      setConversionResult(rate);
      setConversionData({ currencyIHave: cryptoIHave, currencyIWant: cryptoIWant });
    } else {
      dispatch(setError('Error obtaining the data of the selected cryptocurrencies or names.'));
      dispatch(setLoading(false));
    }
  };
  
  return (
    <div className={styles['container-page']}>
      <div className={styles.container}>
        <h1>Currency converter</h1>
      </div>
      <div className={styles['container-selectors']}>
          <h2>Currency I have</h2>
          <CustomSelect crypto={cryptos?.data} type="currencyIHave"/>
        </div>
        <div className={styles['container-selectors']}>
          <h2>Currency I want</h2>
          <CustomSelect crypto={cryptos?.data} type="currencyIWant"/>
        </div>
      <div className={styles['container-buttons']}>
        <button className={styles['button-convert']} onClick={handleConversion}><FaArrowRightArrowLeft /> Convert</button>
      </div>
      <div className={styles.container}>
        <ConvertionDisplay
            currencyIHave={conversionData.currencyIHave}
            currencyIWant={conversionData.currencyIWant}
            conversionRate={conversionResult}
        />
    </div>
    </div>
  );
}