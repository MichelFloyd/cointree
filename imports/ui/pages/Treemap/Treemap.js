import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import d3 from 'd3';
import Loading from '../../components/Loading/Loading';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';
import TreeMap from '../../components/D3/Treemap/Treemap';

import './index.scss';

const Treemap = ({ loading, data, colorAccessor, colors }) => (!loading ? (
  <div className="Treemap">
    <TreeMap
      height={500}
      width={window.innerWidth - 80}
      data={data}
      valueUnit="USD"
      textColor="#222"
      fontSize={14}
      colors={colors}
      colorAccessor={colorAccessor}
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
  let colorAccessor = p => p.percent_change_1h;

  let min = prices && prices[0] && colorAccessor(prices[0]);
  let max = min;
  prices.forEach((price) => {
    if (price.market_cap_usd > 50000000) {
      data.push({ label: price.symbol, value: price.market_cap_usd, link: `/prices/${price.symbol}`, value2: colorAccessor(price) });
      if (colorAccessor(price) < min) min = colorAccessor(price);
      if (colorAccessor(price) > max) max = colorAccessor(price);
    }
  });

  const colors = d3.scale.linear()
    .domain([-2, 2])
    .range(["red", "green"]);

  colorAccessor = p => p.value2;

  return {
    loading: false,
    data,
    colorAccessor,
    colors,
  };
})(Treemap);
