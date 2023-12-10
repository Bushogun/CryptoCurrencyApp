import React from 'react';
import styles from '@/app/components/crypto-card/crypto-card.module.scss';
import { ICrypto } from '@/app/interfaces/i-crypto';
import Link from 'next/link';

interface Props {
  crypto: ICrypto; 
}

const CryptoCard: React.FC<Props> = ({ crypto }) => {
  return (
    <>
      <Link
        key={crypto.id}
        href={`/exchange-rate/${crypto.id}`}
        className={styles.container}
      >
        <div className={styles.container_info}>
          <div className={styles.basic_quote}>
            <div className={styles.name}>
              <h1>{crypto.symbol}</h1>
              <h2>{crypto.name}</h2>
            </div>
            <div className={styles.quote_status}>
              <p>{`${crypto.percent_change_24h}%`} <span>24h</span> </p>
              <p>{`${crypto.percent_change_1h}%`} <span>1h</span> </p>
              <p>{`${crypto.percent_change_7d}%`} <span>7d</span> </p>
            </div>
          </div>
          <div className={styles.value}>
            <p>{`1 ${crypto.symbol} = `}
              <span>
                {`$${crypto.price_usd} USD`}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CryptoCard;
