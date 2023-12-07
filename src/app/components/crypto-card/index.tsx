import styles from './crypto-card.module.scss';

const CryptoCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_info}>
        <div className={styles.basic_quote}>
          <div className={styles.name}>
            <h1>BTC</h1>
            <h2>Bitcoin</h2>
          </div>
          <div className={styles.quote_status}>
            <p>+4.68% <span>24h</span> </p>
            <p>+0.18% <span>1h</span> </p>
            <p>+17.10% <span>7d</span> </p>
          </div>
        </div>

        <div className={styles.value}>
          <p>1 BTC = $5000 USD</p>
        </div>

      </div>
    </div>
  );
};

export default CryptoCard;
