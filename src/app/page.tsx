'use client'
import React, { Component } from 'react';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '@/app/page.module.scss';
import CustomSelect from '@/app/components/custom-select';
import ConvertionDisplay from '@/app/components/convertion-display';
import { setCryptos, setLoading, setError } from '@/redux/features/crypto-slice';
import FetchApi  from '@/Api/data-fetcher';
import { RootState } from '@/redux/store';
import { connect, ConnectedProps } from 'react-redux';

interface ConversionData {
  currencyIHave: string;
  currencyIWant: string;
}

interface HomeProps extends PropsFromRedux {
  endPoint: string;
}

interface HomeState {
  conversionResult: number | null;
  conversionData: ConversionData;
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    
    this.state = {
      conversionResult: null,
      conversionData: { currencyIHave: '', currencyIWant: '' },
    };
  }

  async componentDidMount() {
    const { cryptos, dispatch } = this.props;
  
    if (!cryptos) {
      try {
        dispatch(setLoading(true));
        await this.fetchData();
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError('There was an error in the connection: ' + error));
        dispatch(setLoading(false));
      }
    }
  }

  async fetchData() {
    const { dispatch, endPoint } = this.props;

    const fetchApiClient = new FetchApi();
    const data = await fetchApiClient.fetchData(endPoint);
    dispatch(setCryptos(data));
  }

  handleError(error: Error) {
    const { dispatch } = this.props;
    dispatch(setError('There was an error in the connection: ' + error.message));
    dispatch(setLoading(false));
  }

  calculateConversionRate(cryptoFrom: string, cryptoTo: string, cryptosData: any[]) {
    const { dispatch } = this.props;
    dispatch(setLoading(true));
    const fromCrypto = cryptosData.find((crypto) => crypto.name === cryptoFrom);
    const toCrypto = cryptosData.find((crypto) => crypto.name === cryptoTo);
    const fromPriceUSD = parseFloat(fromCrypto.price_usd);
    const toPriceUSD = parseFloat(toCrypto.price_usd);
    if (isNaN(fromPriceUSD) || isNaN(toPriceUSD)) {
      dispatch(setError('Error converting price to number.'));
      return null;
    }
    const conversionRate = fromPriceUSD / toPriceUSD;
    dispatch(setLoading(false));
    return conversionRate;
  }

  convertCurrency = () => {
    const { cryptoIHave, cryptoIWant, cryptos, dispatch } = this.props;

    if (cryptoIHave && cryptoIWant && cryptos) {
      const rate = this.calculateConversionRate(cryptoIHave, cryptoIWant, cryptos.data);
      this.setState({
        conversionResult: rate,
        conversionData: { currencyIHave: cryptoIHave, currencyIWant: cryptoIWant },
      });
    } else {
      dispatch(setError('Error obtaining the data of the selected cryptocurrencies or names.'));
      dispatch(setLoading(false));
    }
  };

  render() {
    const { conversionData, conversionResult } = this.state;
    const { cryptos } = this.props;
    return (
      <div className={styles['container-page']}>
        <div className={styles.container}>
          <h1>Currency converter</h1>
        </div>
        <div className={styles['container-selectors']}>
          <h2>Currency I have</h2>
          <CustomSelect crypto={this.props.cryptos?.data} type="currencyIHave" dispatchAction={this.props.dispatch} selectedCurrency={this.props.cryptoIHave}/>
        </div>
        <div className={styles['container-selectors']}>
          <h2>Currency I want</h2>
          <CustomSelect crypto={this.props.cryptos?.data} type="currencyIWant" dispatchAction={this.props.dispatch} selectedCurrency={this.props.cryptoIWant}/>
        </div>
        <div className={styles['container-buttons']}>
          <button className={styles['button-convert']} onClick={this.convertCurrency}>
            <FaArrowRightArrowLeft /> Convert
          </button>
        </div>
        <div className={styles.container}>
          <ConvertionDisplay
            currencyIHave={conversionData.currencyIHave}
            currencyIWant={conversionData.currencyIWant}
            conversionRate={conversionResult}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cryptos: state.crypto.cryptos,
  cryptoIHave: state.crypto.currencyIHave,
  cryptoIWant: state.crypto.currencyIWant,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


export default connector(({ NEXT_PUBLIC_API_URL, NEXT_PUBLIC_REQUEST_CRYPTOS, ...props }: any) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
  const endPoint = apiUrl + requestCryptos;
  return <Home {...props} endPoint={endPoint} />;
});