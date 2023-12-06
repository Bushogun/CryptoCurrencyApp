import React, { useState, useEffect } from 'react';
import { ICrypto, Datum } from '@/app/interfaces/i-crypto';
import styles from './custom-select.module.scss';

interface Props {
  crypto: ICrypto;
}

const CustomSelect: React.FC<Props> = ({ crypto }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [cryptoData, setCryptoData] = useState<Datum[]>([]);

  useEffect(() => {
    setCryptoData(crypto.data || []);
  }, [crypto]);

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
      <div className={styles.custom_select}>
        <select
          value={selectedOption}
          onChange={handleOptionSelect}
          className={styles.customSelect}
        >
          <option value="">Selecciona una opción</option>
          {cryptoData.map((cryptoItem, index) => (
            <option key={index} value={cryptoItem.name}>
              {cryptoItem.name}
            </option>
          ))}
        </select>
      </div>
  );
};

export default CustomSelect;
