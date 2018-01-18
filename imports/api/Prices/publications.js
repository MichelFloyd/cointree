import { Meteor } from 'meteor/meteor';
import Prices from './Prices';

Meteor.publish('id.history', function prices(id) {
  return Prices.find({ id });
});

Meteor.publish('symbol.history', function prices(symbol) {
  return Prices.find({ symbol });
});
