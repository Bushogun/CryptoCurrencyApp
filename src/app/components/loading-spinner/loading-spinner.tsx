import React, { Component } from 'react';
import styles from '@/app/components/loading-spinner/loading-spinner.module.scss';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={styles['container-loading']}>
        <div className={styles.loading}></div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default LoadingSpinner;
