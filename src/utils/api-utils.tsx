import { setLoading } from '@/redux/features/productSlice';
import type { AppDispatch } from "@/redux/store";

const fetchData = async (url: string, dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

    if (!response.ok) {
      throw new Error(`Error al cargar datos desde ${url}`);
    }

    const data = await response.json();
    dispatch(setLoading(false));

    return data;
  } catch (error) {
    dispatch(setLoading(false));
    throw error;
  }
};

export const fetchProducts = async (dispatch: AppDispatch, requestProducts: string) => {
  return fetchData(requestProducts, dispatch);
};

export const fetchCategories = async (dispatch: AppDispatch, requestCategories: string) => {
  return fetchData(requestCategories, dispatch);
};

export const fetchProductById = async (dispatch: AppDispatch, productId: string) => {
  const url = `${process.env.NEXT_PUBLIC_REQUEST_PRODUCTS}${productId}`;
  return fetchData(url, dispatch);
};

export const fetchProductsFiltered = async (dispatch: AppDispatch, idFilter: string) => {
  if (idFilter === "All") {
    const url = `${process.env.NEXT_PUBLIC_REQUEST_PRODUCTS}`;
    return fetchData(url, dispatch);
  } else {
    const url = `${process.env.NEXT_PUBLIC_REQUEST_CATEGORY}${idFilter}`;
    return fetchData(url, dispatch);
  }
};