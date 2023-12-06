'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { IProduct } from '@/interfaces/i-product';
import styles from './product-card.module.scss';
import { capitalizeText } from '@/utils/string-utils';
import { useAppDispatch } from '@/redux/hooks';
import { setSelectProduct } from '@/redux/features/productSlice';

interface Props {
  product: IProduct;
  onClick?: () => void;
}

export const Card = ({ product, onClick }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectedProductHandler = () => {
    const productString = JSON.stringify(product.id);
    dispatch(setSelectProduct(productString));
    router.push(`/crud/${product.id}`);
  }

  return (
    <div className={styles['card-container']} onClick={selectedProductHandler}>
      <figure className={styles['card-figure']}>
        <span className={styles['card-bottom-text']}>{capitalizeText(product.category)}</span>
        <img
          className={styles['card-img']}
          src={product.image}
          alt={product.title}
          title={product.title}
        />
      </figure>
      <p className={styles['card-container-info']}>
        <span className={styles['card-info-title']}>{product.title}</span>
        <span className={styles['card-info-price']}>${product.price}</span>
      </p>
    </div>
  );
};
