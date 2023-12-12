import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import { initialStateCrypto } from "@/redux/initial-state";

const currencySlice = createSlice({
  name: "crypto",
  initialState: initialStateCrypto,
  reducers: {
    setCurrencyIHave: (state, action) => {
      state.currencyIHave = action.payload;
    },
    setCurrencyIWant: (state, action) => {
      state.currencyIWant = action.payload;
    },
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
    setCryptos: (state, action) => {
      state.cryptos = action.payload;
    },
    setSpecificCrypto: (state, action) => {
      state.specificCrypto = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrencyIHave,
  setCurrencyIWant,
  setFilterQuery,
  setCryptos,
  setSpecificCrypto,
  setLoading,
  setError,
} = currencySlice.actions;

export default currencySlice.reducer