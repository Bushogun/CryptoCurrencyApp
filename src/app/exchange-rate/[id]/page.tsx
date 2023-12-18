'use client'
import React, { Component } from 'react';
import styles from '@/app/exchange-rate/[id]/exchage-rate-details.module.scss';
import { RootState } from '@/redux/store';
import { setError, setLoading, setSpecificCrypto } from '@/redux/features/crypto-slice';
import LoadingSpinner from '@/app/components/loading-spinner/loading-spinner';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ExchangeRateProps {
  specificCrypto: RootState['crypto']['specificCrypto'];
  loading: RootState['crypto']['loading'];
  error: RootState['crypto']['error'];
  setSpecificCrypto: (data: any) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  params: {
    id: string;
  };
}

class ExchangeRate extends Component<ExchangeRateProps> {
  apiUrl: string;
  requestSpecificCrypto: string;
  endPoint: string;

  constructor(props: ExchangeRateProps) {
    super(props);
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    this.requestSpecificCrypto = process.env.NEXT_PUBLIC_REQUEST_SPECIFIC_CRYPTO!;
    this.endPoint = `${this.apiUrl}${this.requestSpecificCrypto}${this.props.params.id}`;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.fetchData();
  }

  async fetchData() {
    try {
      const res = await fetch(this.endPoint);
      const data = await res.json();
      this.props.setSpecificCrypto(data[0]);
      this.props.setLoading(false);
    } catch (error) {
      this.props.setError('We have a trouble with the connection ' + error);
      this.props.setLoading(false);
    }
  }

  render() {
    const { specificCrypto, loading, error } = this.props;

    return (
      <>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={styles['container-page']}>
            <div className={styles['container-cards']}>
              <div className={styles['basic-quote']}>
                <div className={styles.name}>
                  <h1>{specificCrypto?.name || 'Is not available'}</h1>
                  <h2>{specificCrypto?.symbol || 'Is not available'}</h2>
                </div>
                <div className={styles['quote-status']}>
                  <p>Price USD: {specificCrypto?.price_usd || 'Is not available'}</p>
                  <p><small>Change 24h</small>: {specificCrypto?.percent_change_24h || 'Is not available'}%</p>
                  <p><small>Change 1h</small>: {specificCrypto?.percent_change_1h || 'Is not available'}%</p>
                  <p><small>Change 7d</small>: {specificCrypto?.percent_change_7d || 'Is not available'}%</p>
                </div>
              </div>
              <div className={styles.value}>
                <p>Market Cap USD: {specificCrypto?.market_cap_usd || 'Is not available'}</p>
              </div>
              <div className={styles.supply}>
                <p><span>Current Supply: <br/> </span>{specificCrypto?.csupply || ''}</p>
                <p><span>Total Supply: <br/> </span>{specificCrypto?.tsupply || ''}</p>
                <p><span>Max Supply: <br/> </span>{specificCrypto?.msupply || ''}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  specificCrypto: state.crypto.specificCrypto,
  loading: state.crypto.loading,
  error: state.crypto.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSpecificCrypto: (data: any) => dispatch(setSpecificCrypto(data)),
  setError: (error: string) => dispatch(setError(error)),
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRate);
