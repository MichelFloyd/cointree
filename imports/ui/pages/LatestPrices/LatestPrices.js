import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Table, Alert } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import PricesCollection from '../../../api/LatestPrices/LatestPrices';
import Loading from '../../components/Loading/Loading';

import './index.scss';

const Prices = ({ loading, prices }) => (!loading ? (
  <div className="LatestPrices">
    <div className="page-header clearfix">
      <h4 className="pull-left">Prices</h4>
    </div>
    {prices.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price USD</th>
            <th>Market Cap</th>
            <th>Price BTC</th>
            <th>Volume USD 24h</th>
            <th>% Change 1h</th>
            <th>% Change 24h</th>
            <th>% Change 7d</th>
            <th>% Change Last</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(({
            _id, symbol, price_usd, market_cap_usd, price_btc, volume_usd_24h,
            percent_change_1h, percent_change_24h, percent_change_7d,
            percent_change_last, last_updated,
          }) => (
            <tr key={_id}>
              <td><a href={'/prices/'+symbol}>{symbol}</a></td>
              <td>{price_usd}</td>
              <td>{market_cap_usd}</td>
              <td>{price_btc}</td>
              <td>{volume_usd_24h}</td>
              <td>{percent_change_1h}</td>
              <td>{percent_change_24h}</td>
              <td>{percent_change_7d}</td>
              <td>{percent_change_last}</td>
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
};

export default withTracker(() => {
  const sub = Meteor.subscribe('latestPrices');
  return {
    loading: !sub.ready(), // since collection is globally published
    prices: PricesCollection.find({}, { sort: { market_cap_usd: -1 } }).fetch(),
  };
})(Prices);
