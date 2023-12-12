import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Importa tipos definidos en tu tienda Redux
import type { AppStore, RootState } from '@/redux/store';

// Importa el reducer de tu slice de Redux
import cryptoReducer from '@/redux/features/crypto-slice';

// Define una interfaz extendida de RenderOptions para incluir initialState y store
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// La función renderWithProviders renderiza el componente con el contexto de Redux proporcionado por el Provider
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Crea automáticamente una instancia de store si no se pasa uno
    store = configureStore({
      reducer: { currency: currencySlice },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  // Wrapper es un componente que envuelve el componente a renderizar y provee el contexto de Redux a través del Provider
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Retorna un objeto que contiene el store y todas las funciones de consulta de RTL
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
