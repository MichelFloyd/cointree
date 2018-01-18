import { Meteor } from 'meteor/meteor';
import LatestPrices from './LatestPrices';

Meteor.publish(null, function latestPrices() { // this is a global publication
  console.log(`${LatestPrices.find().count()} latest prices`)
  return LatestPrices.find();
});
