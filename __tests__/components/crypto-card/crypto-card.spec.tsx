import React from 'react';
import { render } from '@testing-library/react';
import { ICryptoData } from '../../../__mocks__/crypto.mock'; 
import CryptoCard from '@/app/components/crypto-card';

describe('CryptoCard component', () => {
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

  it('contains link with correct href', () => {
    const { getByRole } = render(<CryptoCard crypto={mockCrypto} />);
    const linkElement = getByRole('link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/exchange-rate/80'); 
  });
});
