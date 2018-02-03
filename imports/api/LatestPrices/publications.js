import { Meteor } from 'meteor/meteor';
import LatestPrices from './LatestPrices';

const now = new Date();
const sixMinutesAgo = new Date(now - 3600000);
const query = { 
  market_cap_usd: { $gte: 50000000 },
  last_updated: { $gte: sixMinutesAgo },
};
Meteor.publish('latestPrices', () => LatestPrices.find(query));
