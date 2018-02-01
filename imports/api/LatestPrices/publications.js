import { Meteor } from 'meteor/meteor';
import LatestPrices from './LatestPrices';

Meteor.publish('latestPrices', () => LatestPrices.find());
