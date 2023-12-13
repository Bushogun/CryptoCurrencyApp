import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CustomSelect from '@/app/components/custom-select';


const mockStore = configureStore([]);

describe('CustomSelect component', () => {
  const cryptoData = [
    {
        id: "80",
        symbol: "BTC",
        name: "Bitcoin",
        nameid: "Bitcoin",
        rank: 2,
        price_usd: "2185.05",
        percent_change_24h: "-7.21",
        percent_change_1h: "-0.97",
        percent_change_7d: "-2.99",
        price_btc: "0.053306",
        market_cap_usd: "267395607015.03",
        volume24: 15056191016.68043,
        volume24a: 7937987810.329084,
        csupply: "122375302.00",
        tsupply: "122375302",
        msupply: ""
      }
  ];

  it('renders the CustomSelect component correctly', () => {
    const store = mockStore({
      crypto: cryptoData,
    });

    render(
      <Provider store={store}>
        <CustomSelect crypto={cryptoData} type="currencyIHave" />
      </Provider>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    const selectOptions = screen.getAllByRole('option');
    expect(selectOptions).toHaveLength(cryptoData.length + 1);
  });

  it('updates selected option and dispatches action on selection change', () => {
    const store = mockStore({
      crypto: cryptoData,
    });

    render(
      <Provider store={store}>
        <CustomSelect crypto={cryptoData} type="currencyIWant" />
      </Provider>
    );
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Bitcoin' } });
    expect(selectElement).toHaveValue('Bitcoin');
  });
});
