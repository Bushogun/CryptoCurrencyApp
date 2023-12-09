import { ApiResponse } from "@/app/interfaces/i-crypto";
import { ICrypto } from "@/app/interfaces/i-crypto";

export interface StoreCurrency {
  currencyIHave: string;
  currencyIWant: string;
  filterQuery: string;
  cryptos: ApiResponse | undefined; 
  specificCrypto: ICrypto | undefined; 
  limit: number;
  loading: boolean;
  error: string | null;
}

export const initialStateCrypto: StoreCurrency = {
  currencyIHave: '',
  currencyIWant: '',
  filterQuery: '',
  cryptos: undefined, 
  specificCrypto: undefined,
  limit: 100,
  loading: false,
  error: null,
};
