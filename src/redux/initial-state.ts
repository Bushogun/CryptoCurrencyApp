import { ApiResponse } from "@/app/interfaces/i-crypto";

export interface StoreCurrency {
  currencyIHave: string;
  currencyIWant: string;
  filterQuery: string;
  cryptos: ApiResponse | undefined; 
  limit: number;
  loading: boolean;
  error: string | null;
}

export const initialStateCrypto: StoreCurrency = {
  currencyIHave: '',
  currencyIWant: '',
  filterQuery: '',
  cryptos: undefined, 
  limit: 100,
  loading: false,
  error: null,
};
