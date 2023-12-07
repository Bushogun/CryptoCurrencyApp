import React from 'react';
import styles from '@/app/components/loading-spinner/loading-spinner.module.scss';

const LoadingSpinner = () => (
  <div className={styles['container-loading']}>
    <div className={styles.loading}></div>
    <p>Loading...</p>
  </div>
);

export default LoadingSpinner;