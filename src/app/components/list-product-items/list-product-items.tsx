import React from 'react';
import { Card } from '@/components/list-product-items/product-card/product-card';
import { IProduct } from '@/interfaces/i-product';
import { useAppSelector } from '@/redux/hooks';
import styles from './list-product-item.module.scss';

const ListItems = () => {
  const products = useAppSelector(state => state.productReducer.products);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles['cards-container']}>
      {products.map((product: IProduct, index: number) => (
        <Card key={index} product={product} />
      ))}
    </div>
  );
};

export default ListItems;
