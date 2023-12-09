'use client'
import React, { useEffect, useState } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '@/app/page.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import CustomSelect from '@/app/components/custom-select';
import ConvertionDisplay from '@/app/components/convertion-display'
import { setCryptos, setLoading, setError } from '@/redux/features/crypto-slice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos
  const cryptos = useAppSelector((state) => state.currencyReducer.cryptos?.data);
  const cryptoIHave = useAppSelector((state) => state.currencyReducer.currencyIHave);
  const cryptoIWant = useAppSelector((state) => state.currencyReducer.currencyIWant);

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

  function calculateConversionRate(cryptoFrom: string, cryptoTo: string, cryptosData: any[]) {
    dispatch(setLoading(true));
    const fromCrypto = cryptosData.find((crypto) => crypto.name === cryptoFrom);
    const toCrypto = cryptosData.find((crypto) => crypto.name === cryptoTo);

    if (!fromCrypto || !toCrypto) {
      console.error('Una o ambas criptomonedas no se encontraron en los datos.');
      return null;
    }
  
    const fromPriceUSD = parseFloat(fromCrypto.price_usd);
    const toPriceUSD = parseFloat(toCrypto.price_usd);
  
    if (isNaN(fromPriceUSD) || isNaN(toPriceUSD)) {
      console.error('Error al convertir el precio a número.');
      return null;
    }
  
    const conversionRate = fromPriceUSD / toPriceUSD;
    dispatch(setLoading(false));
    return conversionRate;
  }
  

  const handleConversion = () => {
    if (cryptoIHave && cryptoIWant && cryptos) {
      const rate = calculateConversionRate(cryptoIHave, cryptoIWant, cryptos);
      setConversionResult(rate);
    } else {
      dispatch(setError('Error al obtener los datos de las criptomonedas o los nombres seleccionados.'), setLoading(false))
    }
  };
  
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
        <button className={styles.button_convert} onClick={handleConversion}><FaArrowRightArrowLeft /> Convert</button>
      </div>
      <div className={styles.container}>
        <ConvertionDisplay
          currencyIHave={cryptoIHave}
          currencyIWant={cryptoIWant}
          conversionRate={conversionResult}
        />
    </div>
    </div>
  );
}
