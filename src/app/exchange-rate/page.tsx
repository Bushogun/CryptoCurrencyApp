'use client'
import React, { Component } from 'react';
import styles from '@/app/exchange-rate/exchange-rate.module.scss';
import CryptoCard from '@/app/components/crypto-card';
import { RootState } from '@/redux/store';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { setCryptos, setError, setLoading } from '@/redux/features/crypto-slice';
import { ICrypto } from '@/app/interfaces/i-crypto';
import LoadingSpinner from '@/app/components/loading-spinner/loading-spinner';
import { Dispatch } from 'redux';
import SearchBarForm from '@/app/components/search-bar/search-bar-form';

interface ExchangeRateProps {
  cryptos: RootState['crypto']['cryptos'];
  filterQuery: RootState['crypto']['filterQuery'];
  loading: RootState['crypto']['loading'];
  error: RootState['crypto']['error'];
  setCryptos: (data: any) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

interface ExchangeRateState {
  start: number;
  limit: number;
  coinsNum: number;
  currentPage: number;
}

class ExchangeRate extends Component<ExchangeRateProps, ExchangeRateState> {
  apiUrl: string;
  requestCryptos: string;
  endPoint: string;

  constructor(props: ExchangeRateProps) {
    super(props);
    this.state = {
      start: 0,
      limit: 100,
      coinsNum: 0,
      currentPage: 1,
    };

    this.apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    this.requestCryptos = process.env.NEXT_PUBLIC_REQUEST_CRYPTOS!;
    this.endPoint = this.apiUrl + this.requestCryptos;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.fetchData();
  }

  async fetchData() {
    const { start, limit } = this.state;
    const { setCryptos, setLoading, setError } = this.props;

    try {
      const response = await fetch(`${this.endPoint}?start=${start}&limit=${limit}`);
      const data = await response.json();
      setCryptos(data);
      this.setState({ coinsNum: data.info.coins_num });
      setLoading(false);
    } catch (error) {
      setError('There was an error in the connection: ' + error);
      setLoading(false);
    }
  }

  handleNextPage = () => {
    const { start, limit, coinsNum, currentPage } = this.state;

    if (start + limit < coinsNum) {
      this.setState({ start: start + limit, currentPage: currentPage + 1 }, () => {
        this.fetchData();
      });
    }
  };

  handlePrevPage = () => {
    const { start, limit, currentPage } = this.state;
    if (start - limit >= 0) {
      this.setState({ start: start - limit, currentPage: currentPage - 1 }, () => {
        this.fetchData();
      });
    }
  };

  render() {
    const { filterQuery, loading, error, cryptos } = this.props;
    const { start, limit, coinsNum } = this.state;

    const filteredCryptos =
      cryptos && cryptos.data
        ? cryptos.data.filter((crypto: ICrypto) => {
            return (
              crypto.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
              crypto.symbol.toLowerCase().includes(filterQuery.toLowerCase())
            );
          })
        : [];

    return (
      <div className={styles.listContainer}>
        <>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className={styles['container-page']}>
              <div className={styles['container-cards']}>
                <h1>Exchange Rate</h1>
                <div className={styles['container-search-bar']}>
                  <SearchBarForm />
                </div>
                {filteredCryptos && filteredCryptos.length > 0 ? (
                  filteredCryptos.map((crypto: ICrypto) => (
                    <CryptoCard key={crypto.id} crypto={crypto} />
                  ))
                ) : (
                  <p className={styles['not-found']}>Not found your search :(</p>
                )}
                <div className={styles['container-buttons']}>
                  <button onClick={this.handlePrevPage} disabled={start === 0}>
                    <FaArrowAltCircleLeft />
                  </button>
                  <button onClick={this.handleNextPage} disabled={start + limit >= coinsNum}>
                    <FaArrowAltCircleRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cryptos: state.crypto.cryptos,
  filterQuery: state.crypto.filterQuery,
  loading: state.crypto.loading,
  error: state.crypto.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCryptos: (data: any) => dispatch(setCryptos(data)),
  setError: (error: string) => dispatch(setError(error)),
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);
