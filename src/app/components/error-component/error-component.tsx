import React from 'react';
import styles from './error-component.module.scss';

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => (
  <div className={styles['container-loading']}>
    <p>Error: {error}</p>
  </div>
);

export default ErrorComponent;