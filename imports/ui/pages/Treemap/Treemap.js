import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import d3 from 'd3';
import Loading from '../../components/Loading/Loading';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';
import TreeMap from '../../components/D3/Treemap/Treemap';

import './index.scss';

const Treemap = ({ loading, data, colorAccessor, colors, totalCap, vol24h }) => (!loading ? (
  <div className="Treemap">
    <div className="TreemapControls">
      <ButtonToolbar>
        Total Market Cap: <b>${(totalCap / 1e9).toFixed(0)}B</b> Volume 24h: <b>${(vol24h / 1e9).toFixed(0)}B</b>
        &nbsp;Cell size:&nbsp;
        <ToggleButtonGroup type="radio" name="sizeOptions" defaultValue={1}>
          <ToggleButton value={1}>Market Cap</ToggleButton>
          <ToggleButton value={2}>Volume 24h</ToggleButton>
        </ToggleButtonGroup>
        &nbsp;Cell color:&nbsp;
        <ToggleButtonGroup type="radio" name="colorOptions" defaultValue={1}>
          <ToggleButton value={1}>1h change</ToggleButton>
          <ToggleButton value={2}>24h change</ToggleButton>
          <ToggleButton value={2}>7d change</ToggleButton>
        </ToggleButtonGroup>
      </ButtonToolbar>
    </div>
    <div className="Treemap">
      <TreeMap
        height={500}
        width={window.innerWidth - 80}
        data={data}
        valueUnit="USD"
        textColor="#ccc"
        fontSize={14}
        colors={colors}
        colorAccessor={colorAccessor}
      />
    </div>
  </div>
) : <Loading />);

Treemap.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  colorAccessor: PropTypes.func.isRequired,
  colors: PropTypes.func.isRequired,
};

export default withTracker(() => {
  const prices = LatestPrices.find().fetch();
  const data = [];
  let colorAccessor = p => p.percent_change_7d;

  let min = prices && prices[0] && colorAccessor(prices[0]);
  let max = min;
  let totalCap = 0;
  let vol24h = 0;
  prices.forEach((price) => {
    if (price.market_cap_usd > 50000000) {
      data.push({ label: price.symbol, value: price.volume_usd_24h, link: `/prices/${price.symbol}`, value2: colorAccessor(price) });
      if (colorAccessor(price) < min) min = colorAccessor(price);
      if (colorAccessor(price) > max) max = colorAccessor(price);
      totalCap += price.market_cap_usd;
      vol24h += price.volume_usd_24h;
    }
  });

  const colors = (v) => {
    if (v < 0) return d3.scale.linear().domain([-2, Math.log10(-min)]).range(['#000', 'red'])(Math.log(-v));
    return d3.scale.linear().domain([-2, Math.log10(max)]).range(['000', 'green'])(Math.log(v));
  };
  colorAccessor = p => p.value2;

  return {
    loading: false,
    data,
    colorAccessor,
    colors,
    totalCap,
    vol24h
  };
})(Treemap);
