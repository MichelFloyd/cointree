import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';
import TreeMap from '../D3/TM/TreeMap';

import './index.scss';

const Treemap = ({ loading, data }) => (!loading ? (
  <div className="Treemap">
    <TreeMap
      height={500}
      width={window.innerWidth - 80}
      data={data}
      valueUnit="USD"
    />
  </div>
) : <Loading />);

Treemap.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const prices = LatestPrices.find().fetch();
  const data = [];
  prices.forEach((price) => {
    if (price.market_cap_usd > 50000000) data.push({ label: price.symbol, value: price.market_cap_usd, link: `/prices/${price.symbol}` });
  });

  return {
    loading: false,
    prices: LatestPrices.find().fetch(),
    data,
  };
})(Treemap);
