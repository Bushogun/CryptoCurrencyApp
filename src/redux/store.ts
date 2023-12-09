import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./features/crypto-slice";

export const store = configureStore({
  reducer: {
    currencyReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
