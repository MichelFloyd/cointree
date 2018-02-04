import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
import Prices from './Prices';

Meteor.publish('symbol.history', function prices(symbol) {
  check(symbol, String);
  return Prices.find({ symbol }, { limit: 256 });
});
