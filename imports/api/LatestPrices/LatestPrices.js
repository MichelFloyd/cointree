/* eslint-disable consistent-return */
import { Mongo } from 'meteor/mongo';

const LatestPrices = new Mongo.Collection('latestprices');

LatestPrices.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

LatestPrices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default LatestPrices;
