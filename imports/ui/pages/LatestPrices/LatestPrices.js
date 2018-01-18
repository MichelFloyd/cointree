import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PricesCollection from '../../../api/LatestPrices/LatestPrices';
import { monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './index.scss';

const Prices = ({ loading, prices }) => (!loading ? (
  <div className="Prices">
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
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(({
            _id, symbol, price_usd, market_cap_usd, last_updated,
          }) => (
            <tr key={_id}>
              <td>{symbol}</td>
              <td>{price_usd}</td>
              <td>{market_cap_usd}</td>
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
  return {
    loading: false, // since collection is globally published
    prices: PricesCollection.find({}, { sort: { last_updated: -1, market_cap_usd: -1 }, limit: 2000 }).fetch(),
  };
})(Prices);
