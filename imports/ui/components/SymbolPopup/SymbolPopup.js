import React from 'react';
import PropTypes from 'prop-types';
import formatCurrency from '../../../modules/format-currency';

import './index.scss';

const upDown = value => (<em className={value < 0 ? 'down' : 'up'}>{value}</em>);

const SymbolPopup = ({ data }) => (
  data ? (
    <div className="SymbolPopup" style={{ right: $('.navbar-header') ? $('.navbar-header').offset().left : '5px' }}>
      Symbol: <em>{data.symbol}</em>&nbsp;
      Name: <em>{data.name}</em>&nbsp;
      Rank: <em>{data.rank}</em><br />
      Price (USD): <em>{data.price_usd}</em>&nbsp;
      Price (BTC): <em>{data.price_btc}</em><br />
      Cap (USD): <em>{formatCurrency(data.market_cap_usd)}</em>&nbsp;
      Volume 24h (USD): <em>{formatCurrency(data.volume_usd_24h)}</em><br />
      Supply:&nbsp;
      Avail: <em>{formatCurrency(data.available_supply)}</em>&nbsp;
      Total: <em>{formatCurrency(data.total_supply)}</em>&nbsp;
      Max: <em>{formatCurrency(data.max_supply)}</em><br />
      % Last Change: {upDown(data.percent_change_last)}&nbsp;
      1h: {upDown(data.percent_change_1h)}&nbsp;
      24h: {upDown(data.percent_change_24h)}&nbsp;
      7d: {upDown(data.percent_change_7d)}
    </div>
  ) : null);

SymbolPopup.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    price_usd: PropTypes.number.isRequired,
    price_btc: PropTypes.number.isRequired,
    volume_usd_24h: PropTypes.number.isRequired,
    market_cap_usd: PropTypes.number.isRequired,
    available_supply: PropTypes.number.isRequired,
    total_supply: PropTypes.number.isRequired,
    max_supply: PropTypes.number.isRequired,
    percent_change_1h: PropTypes.number.isRequired,
    percent_change_24h: PropTypes.number.isRequired,
    percent_change_7d: PropTypes.number.isRequired,
    percent_change_last: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    last_updated: PropTypes.instanceOf(Date).isRequired,
  }),
};

SymbolPopup.defaultProps = {
  data: null,
};

export default SymbolPopup;
