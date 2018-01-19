import TreeMap from 'react-d3-treemap';
import 'react-d3-treemap/dist/react.d3.treemap.css';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import { withTracker } from 'meteor/react-meteor-data';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';

import './index.scss';

const Treemap = ({ loading, data }) => (!loading ? (
  <div className="Treemap">
    <TreeMap
      height={500}
      width={800}
      data={data}
      valueUnit={'USD'}
    />
  </div>
) : <Loading />);

Treemap.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const prices = LatestPrices.find().fetch();
  const data = { name: 'flare', children: [] };
  prices.forEach((price) => {
    data.children.push({ name: price.symbol, value: price.market_cap_usd });
  });

  return {
    prices: LatestPrices.find().fetch(),
    data,
  };
})(Treemap);
