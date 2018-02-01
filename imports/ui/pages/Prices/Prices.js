import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PricesCollection from '../../../api/Prices/Prices';
import Loading from '../../components/Loading/Loading';

import './index.scss';

const Prices = ({ loading, prices, symbol }) => (!loading ? (
  <div className="Prices">
    <div className="page-header clearfix">
      <h4 className="pull-left">Price History for {symbol}</h4>
    </div>
    {prices.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Price USD</th>
            <th>Market Cap</th>
            <th>Price BTC</th>
            <th>Volume USD 24h</th>
            <th>% Last Change</th>
            <th>% Change 1h</th>
            <th>% Change 24h</th>
            <th>% Change 7d</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(({
            _id, symbol, price_usd, market_cap_usd, price_btc, volume_usd_24h,
            percent_change_1h, percent_change_last, percent_change_24h, percent_change_7d, last_updated,
          }) => (
            <tr key={_id}>
              <td>{price_usd}</td>
              <td>{market_cap_usd}</td>
              <td>{price_btc}</td>
              <td>{volume_usd_24h}</td>
              <td className={percent_change_last < 0 ? 'down' : 'up'}>{percent_change_last}</td>
              <td className={percent_change_1h < 0 ? 'down' : 'up'}>{percent_change_1h}</td>
              <td className={percent_change_24h < 0 ? 'down' : 'up'}>{percent_change_24h}</td>
              <td className={percent_change_7d < 0 ? 'down' : 'up'}>{percent_change_7d}</td>
              <td>{last_updated.toLocaleDateString()} {last_updated.toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </Table> : <Alert bsStyle="warning">No prices yet!</Alert>}
  </div>
) : <Loading />);

Prices.propTypes = {
  loading: PropTypes.bool.isRequired,
  prices: PropTypes.arrayOf(PropTypes.object).isRequired,
  symbol: PropTypes.string.isRequired,
};

export default withTracker(({ match }) => {
  const { symbol } = match.params;
  const subcription = Meteor.subscribe('symbol.history', symbol);
  return {
    loading: !subcription.ready(), // since collection is globally published
    prices: PricesCollection.find({ symbol }, { sort: { last_updated: -1 } }).fetch(),
    symbol,
  };
})(Prices);
