import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { ICrypto } from '@/app/interfaces/i-crypto';
import styles from '@/app/components/custom-select/custom-select.module.scss';
import { setCurrencyIHave, setCurrencyIWant } from '@/redux/features/crypto-slice';

interface Props {
  crypto: ICrypto[] | undefined;
  type: 'currencyIHave' | 'currencyIWant'; 
}

const CustomSelect: React.FC<Props> = ({ crypto, type }) => {
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (crypto) {
      setSelectedOption(''); 
    }
  }, [crypto]);

  const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (type === 'currencyIHave') {
      dispatch(setCurrencyIHave(selectedValue));
    } else if (type === 'currencyIWant') {
      dispatch(setCurrencyIWant(selectedValue));
    }
  };

  return (
    <div className={styles['custom-select']}>
      <select
        id={type}
        value={selectedOption}
        onChange={handleOptionSelect}
        className={styles['custom-select']}
      >
        <option value="">Select an option</option>
        {crypto?.map((cryptoItem, index) => (
          <option key={index} value={cryptoItem.name}>
            {cryptoItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
