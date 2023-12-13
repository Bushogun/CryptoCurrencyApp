import { render, screen, fireEvent } from '@testing-library/react';
import ConvertionDisplay from '@/app/components/convertion-display';

describe('ConvertionDisplay component', () => {
  it('should render "Result" when conversionRate is null', () => {
    render(
      <ConvertionDisplay
        currencyIHave="Bitcoin"
        currencyIWant="Ethereum"
        conversionRate={null}
      />
    );

    const resultElement = screen.getByText('Result');
    expect(resultElement).toBeInTheDocument();
  });

  it('should render the conversion rate when conversionRate is not null', () => {
    render(
      <ConvertionDisplay
        currencyIHave="Bitcoin"
        currencyIWant="Ethereum"
        conversionRate={1.2}
      />
    );

    const displayElement = screen.getByText('1 Bitcoin = 18.87 Ethereum');
    expect(displayElement).toBeInTheDocument();
  });

});
