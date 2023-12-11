import React from 'react';
import styles from '@/app/components/convertion-display/convertion-display.module.scss';
import { formatNumber } from '@/utils/number-utils'; 

const ConvertionDisplay = ({ currencyIHave, currencyIWant, conversionRate }: {
  currencyIHave: string,
  currencyIWant: string,
  conversionRate: number | null
}) => {
  const displayValue = conversionRate ? `1 ${currencyIHave} = ${formatNumber(conversionRate)} ${currencyIWant}` : 'Result';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(displayValue);
    alert('Conversion copied to clipboard!');
  };

  return (
    <>
      <div className={styles.container} onClick={handleCopyToClipboard} style={{ cursor: 'pointer' }}>
        <div className={styles['container-display']}>
          <h3>{displayValue}</h3>
        </div>
      </div>
    </>
  );
};

export default ConvertionDisplay;
