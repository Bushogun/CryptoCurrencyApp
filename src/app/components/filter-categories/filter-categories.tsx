'use client'
import React, { useState, useEffect } from 'react';
import styles from './filter-categories.module.scss';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { capitalizeText } from '@/utils/string-utils';
import { setProducts, setSelectCategory } from '@/redux/features/productSlice';
import { setError } from '@/redux/features/productSlice';
import { fetchProductsFiltered } from '@/utils/api-utils';

export const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.productReducer.categories);
    const selectedCategoryRe = useAppSelector((state) => state.productReducer.selectCategory);
    const [selectedCategoryLocal, setSelectedCategoryLocal] = useState<string>('');

    useEffect(() => {
        if (selectedCategoryLocal) {
            fetchProductsFilteredCategories();
        }
    }, [selectedCategoryLocal]);

    const fetchProductsFilteredCategories = async () => {
        try {
            const productsFiltered = await fetchProductsFiltered(dispatch, selectedCategoryLocal);
            dispatch(setProducts(productsFiltered));
        } catch (error) {
            dispatch(setError('ha ocurrido un error en el servidor'));
        }
    };

    if (categories.length === 0) {
        return null;
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategoryLocal(category);
        dispatch(setSelectCategory(category));
    };

    return (
        <div className={styles['radio-input']}>
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <input
                        value={category}
                        name="category-radio"
                        id={`category-${index + 1}`}
                        type="radio"
                        checked={selectedCategoryRe === category}
                        onChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={`category-${index + 1}`}>{capitalizeText(category)}</label>
                </React.Fragment>
            ))}
        </div>
    );
};
