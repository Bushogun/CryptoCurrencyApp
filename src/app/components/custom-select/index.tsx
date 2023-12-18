import React, { Component, ChangeEvent } from 'react';
import { ICrypto } from '@/app/interfaces/i-crypto';
import styles from '@/app/components/custom-select/custom-select.module.scss';
import { setCurrencyIHave, setCurrencyIWant } from '@/redux/features/crypto-slice';

interface CustomSelectProps {
  crypto: ICrypto[] | undefined;
  type: 'currencyIHave' | 'currencyIWant'; 
  dispatchAction: (action: any) => void; 
  selectedCurrency: string;
}

interface CustomSelectState {
  selectedOption: string;
}

class CustomSelect extends Component<CustomSelectProps, CustomSelectState> {
  constructor(props: CustomSelectProps) {
    super(props);
    this.state = {
      selectedOption: this.props.selectedCurrency || ''
    };
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
  }

  componentDidUpdate(prevProps: CustomSelectProps) {
    const { crypto, selectedCurrency } = this.props;
    if (crypto !== prevProps.crypto && crypto && selectedCurrency !== this.state.selectedOption) {
      this.setState({ selectedOption: selectedCurrency });
    }
  }

  handleOptionSelect(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    this.setState({ selectedOption: selectedValue });

    const { type, dispatchAction } = this.props;
    if (type === 'currencyIHave') {
      dispatchAction(setCurrencyIHave(selectedValue));
    } else if (type === 'currencyIWant') {
      dispatchAction(setCurrencyIWant(selectedValue));
    }
  }

  render() {
    const { selectedOption } = this.state;
    const { crypto, type } = this.props;

    return (
      <div className={styles['custom-select']}>
        <select
          id={type}
          value={selectedOption}
          onChange={this.handleOptionSelect}
          className={styles['custom-select']}
        >
          <option value="">Select an option</option>
          {crypto?.map((cryptoItem, index) => (
            <option key={index} value={cryptoItem.name}>
              {cryptoItem.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default CustomSelect;
