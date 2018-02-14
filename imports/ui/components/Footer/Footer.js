import React from 'react';
import { Grid } from 'react-bootstrap';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2018' ? '2018' : `2018-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <Grid>
      <p className="pull-left">
        &copy; {copyrightYear()} Cointreemap by Cloak Security.
        Data provided by <a href='https://coinmarketcap.com/'>CoinMarketCap</a>
      </p>
      {/* <ul className="pull-right">
        <li><Link to="/terms">Terms<span className="hidden-xs"> of Service</span></Link></li>
        <li><Link to="/privacy">Privacy<span className="hidden-xs"> Policy</span></Link></li>
      </ul> */}
    </Grid>
  </div>
);

Footer.propTypes = {};

export default Footer;
