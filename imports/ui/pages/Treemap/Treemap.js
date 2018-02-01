import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import d3 from 'd3';
import Loading from '../../components/Loading/Loading';
import LatestPrices from '../../../api/LatestPrices/LatestPrices';
import TreeMap from '../../components/D3/Treemap/Treemap';

import './index.scss';

class Treemap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setSize = this.setSize.bind(this);
    this.setColor = this.setColor.bind(this);

    this.sizeMenu = ['Market Cap', 'Volume 24'];
    this.colorMenu = ['Last Change', '1h Change', '24h Change', '7d Change'];
    this.sizeSelectorOptions = ['market_cap_usd', 'volume_usd_24h'];
    this.colorSelectorOptions = ['percent_change_last', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d'];

    const { data, colors, totalCap, vol24h } = this.getData();
    this.state = {
      radioSize: 0,
      radioColor: 0,
      data,
      colors,
      totalCap,
      vol24h,
    };
  }

  componentWillReceiveProps() {
    const { data, colors, totalCap, vol24h } = this.getData();
    this.setState({ data, colors, totalCap, vol24h });   
  }

  setSize(ekey) {
    this.setState({ radioSize: ekey });
    Meteor.defer(() => {
      const { data, colors, totalCap, vol24h } = this.getData();
      this.setState({ data, colors, totalCap, vol24h });
    });
  }

  setColor(ekey) {
    this.setState({ radioColor: ekey });
    Meteor.defer(() => {
      const { data, colors, totalCap, vol24h } = this.getData();
      this.setState({ data, colors, totalCap, vol24h });
    });
  }

  getData() {
    const { prices } = this.props;
    let sizeSelector = this.sizeSelectorOptions[0];
    let colorSelector = this.colorSelectorOptions[0];

    if (this.state) {
      sizeSelector = this.sizeSelectorOptions[this.state.radioSize];
      colorSelector = this.colorSelectorOptions[this.state.radioColor];
    }

    const data = [];
    const colorAccessor = p => p[colorSelector];

    let min = prices && prices[0] && colorAccessor(prices[0]);
    let max = min;
    let totalCap = 0;
    let vol24h = 0;
    prices.forEach((price) => {
      if (price.market_cap_usd > 50e6) {
        data.push({
          label: price.symbol,
          value: price[sizeSelector],
          link: `/prices/${price.symbol}`,
          value2: colorAccessor(price),
        });
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
    return {
      totalCap, vol24h, data, colors,
    };
  }

  render() {
    const { loading } = this.props;
    return (!loading ? (
      <div className="Treemap">
        <div className="TreemapControls">
            Total Market Cap: <b>${(this.state.totalCap / 1e9).toFixed(0)}B</b> Volume 24h: <b>${(this.state.vol24h / 1e9).toFixed(0)}B</b>
            &nbsp;Cell size:&nbsp;
            <DropdownButton id="sizeOptions" title={this.sizeMenu[this.state.radioSize]} value={this.state.radioSize} onSelect={this.setSize}>
              {this.sizeMenu.map((m, i) =>
                <MenuItem key={i} eventKey={i} padding={i}>{this.sizeMenu[i]}</MenuItem>)
              }
            </DropdownButton>
            &nbsp;Cell color:&nbsp;
            <DropdownButton id="colorOptions" title={this.colorMenu[this.state.radioColor]} value={this.state.radioColor} onSelect={this.setColor}>
              {this.colorMenu.map((m, i) =>
                <MenuItem key={i} eventKey={i}>{this.colorMenu[i]}</MenuItem>)
              }
            </DropdownButton>
        </div>
        <div className="Treemap">
          <TreeMap
            height={500}
            width={window.innerWidth - 80}
            data={this.state.data}
            valueUnit="USD"
            textColor="#ccc"
            fontSize={14}
            colors={this.state.colors}
            colorAccessor={p => p.value2}
          />
        </div>
      </div>
    ) : <Loading />);
  }
}

Treemap.propTypes = {
  loading: PropTypes.bool.isRequired,
  prices: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('latestPrices');
  return {
    loading: !sub.ready(),
    prices: LatestPrices.find().fetch(),
  };
})(Treemap);
