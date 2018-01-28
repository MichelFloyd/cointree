import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import d3 from 'd3';
import Loading from '../../components/Loading/Loading';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';
import TreeMap from '../../components/D3/Treemap/Treemap';

import './index.scss';

const sizeSelectorOptions = ['market_cap_usd', 'volume_usd_24h'];
const colorSelectorOptions = ['percent_change_1h', 'percent_change_24h', 'percent_change_7d'];
const sizeSelector = new ReactiveVar(sizeSelectorOptions[0]);
const colorSelector = new ReactiveVar(colorSelectorOptions[0]);

class Treemap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setSize = this.setSize.bind(this);
    this.setColor = this.setColor.bind(this);

    this.state = {
      radioSize: 0,
      radioColor: 0,
    };

    this.sizeMenu = ['Market Cap', 'Volume 24'];
    this.colorMenu = ['1h Change', '24h Change', '7d Change']
  }

  setSize(ekey) {
    this.setState({ radioSize: ekey - 1 });
    sizeSelector.set(sizeSelectorOptions[ekey - 1]);
  }

  setColor(ekey) {
    this.setState({ radioColor: ekey - 1 });
    colorSelector.set(colorSelectorOptions[ekey - 1]);
  }

  render() {
    const { loading, data, colorAccessor, colors, totalCap, vol24h } = this.props;
    return (!loading ? (
      <div className="Treemap">
        <div className="TreemapControls">
            Total Market Cap: <b>${(totalCap / 1e9).toFixed(0)}B</b> Volume 24h: <b>${(vol24h / 1e9).toFixed(0)}B</b>
            &nbsp;Cell size:&nbsp;
            <DropdownButton id="sizeOptions" title={this.sizeMenu[this.state.radioSize]} value={this.state.radioSize} onSelect={this.setSize}>
              <MenuItem eventKey={1} padding={0}>{this.sizeMenu[0]}</MenuItem>
              <MenuItem eventKey={2} padding={0}>{this.sizeMenu[1]}</MenuItem>
            </DropdownButton>
            &nbsp;Cell color:&nbsp;
            <DropdownButton id="colorOptions" title={this.colorMenu[this.state.radioColor]} value={this.state.radioColor} onSelect={this.setColor}>
              <MenuItem eventKey={1}>{this.colorMenu[0]}</MenuItem>
              <MenuItem eventKey={2}>{this.colorMenu[1]}</MenuItem>
              <MenuItem eventKey={3}>{this.colorMenu[2]}</MenuItem>
            </DropdownButton>
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
  }
}

Treemap.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  colorAccessor: PropTypes.func.isRequired,
  colors: PropTypes.func.isRequired,
};

export default withTracker(() => {
  const prices = LatestPrices.find().fetch();
  const data = [];
  let colorAccessor = p => p[colorSelector.get()];

  let min = prices && prices[0] && colorAccessor(prices[0]);
  let max = min;
  let totalCap = 0;
  let vol24h = 0;
  prices.forEach((price) => {
    if (price.market_cap_usd > 50000000) {
      data.push({ label: price.symbol, value: price[sizeSelector.get()], link: `/prices/${price.symbol}`, value2: colorAccessor(price) });
      if (colorAccessor(price) < min) min = colorAccessor(price);
      if (colorAccessor(price) > max) max = colorAccessor(price);
    }
    totalCap += price.market_cap_usd;
    vol24h += price.volume_usd_24h;
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
    vol24h,
  };
})(Treemap);
