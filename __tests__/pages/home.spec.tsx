import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/redux/store';
import { ICryptoData } from '../../__mocks__/crypto.mock'; 
import Home from '@/app/page';

const mockCrypto: ICryptoData = {
    id: "80",
    symbol: "BTC",
    name: "Bitcoin",
    nameid: "bitcoin",
    rank: 1,
    price_usd: "40000",
    percent_change_24h: "5",
    percent_change_1h: "2",
    percent_change_7d: "-3",
    price_btc: "1",
    market_cap_usd: "750000000000",
    volume24: 1234567890,
    volume24a: 9876543210,
    csupply: "21000000",
    tsupply: "21000000",
    msupply: "21000000"
  };


function mockResponse(data: any): Response {
  return new Response(JSON.stringify(data));
}

global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    mockCrypto 
  }),
} as unknown as Response);

describe('Home Component', () => {
  it('Should render properly', async () => {
    const store = setupStore(); 
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await screen.findByRole('heading', { name: /Currency converter/i });

    const header = screen.getByRole('heading', { name: /Currency converter/i });
    const headerText = 'Currency converter';

    expect(header).toHaveTextContent(headerText);
  });
});
