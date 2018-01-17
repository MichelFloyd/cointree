import { Meteor } from 'meteor/meteor';
import Prices from './Prices';

Meteor.publish('prices', function prices() {
  return Prices.find({},{ fields: { symbol: 1, price_usd: 1, market_cap_usd: 1, last_updated: 1 }, limit: 1000 });
});
