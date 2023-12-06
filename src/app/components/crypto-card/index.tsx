import styles from './crypto-card.module.scss';

const CryptoCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_display}>
        <h1>BTC</h1> 
        <h3>Bitcoin</h3> 
        <h2>1 BTC = $5000 USD</h2> 
        <div className={styles.changes}>
            <p>24h Change: +4.68%</p> 
            <p>1h Change: +0.18%</p> 
            <p>7d Change: +17.10%</p> 
        </div>
        
        <div className={styles.supplyInfo}>
          <p>Available Supply: 19,470,946 BTC</p> 
          <p>Total Supply: 19,470,946 BTC</p> 
          <p>Max Supply: 21,000,000 BTC</p> 
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
