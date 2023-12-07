export interface StoreCurrency{
    filterQuery: string;
    cryptos: [];
    limit: number;
    loading: Boolean;
    error: string | null;
  }
  export const initialStateCrypto: StoreCurrency = {
    filterQuery: "",
    cryptos: [],
    limit: 100,
    loading: false,
    error: null,
  };
  