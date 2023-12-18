import React, { Component } from 'react';
import styles from '@/app/components/convertion-display/convertion-display.module.scss';
import { formatNumber } from '@/utils/number-utils';

interface ConvertionDisplayProps {
  currencyIHave: string;
  currencyIWant: string;
  conversionRate: number | null;
}

class ConvertionDisplay extends Component<ConvertionDisplayProps> {
  handleCopyToClipboard = () => {
    const { currencyIHave, currencyIWant, conversionRate } = this.props;
    const displayValue = conversionRate
      ? `1 ${currencyIHave} = ${formatNumber(conversionRate)} ${currencyIWant}`
      : 'Result';
    navigator.clipboard.writeText(displayValue);
    alert('Conversion copied to clipboard!');
  };

  render() {
    const { conversionRate } = this.props;
    const { currencyIHave, currencyIWant } = this.props;
    const displayValue = conversionRate
      ? `1 ${currencyIHave} = ${formatNumber(conversionRate)} ${currencyIWant}`
      : 'Result';

    return (
      <>
        <div
          className={styles.container}
          onClick={this.handleCopyToClipboard}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles['container-display']}>
            <h3>{displayValue}</h3>
          </div>
        </div>
      </>
    );
  }
}

export default ConvertionDisplay;
