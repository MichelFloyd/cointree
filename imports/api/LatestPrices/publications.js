import { Meteor } from 'meteor/meteor';
import LatestPrices from './LatestPrices';

Meteor.publish(null, function latestPrices() { // this is a global automatic publication to all clients
  return LatestPrices.find();
});
