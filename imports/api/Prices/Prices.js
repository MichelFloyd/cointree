import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Prices = new Mongo.Collection('prices');

Prices.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Prices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Prices.schema = new SimpleSchema({
  id: { type: String, label: 'The coinmarketbase id' },
  name: { type: String, label: 'The name' },
  symbol: { type: String, label: 'The symbol' },
  rank: { type: Number, label: 'Rank by market cap' },
  price_usd: { type: Number, label: 'Price in USD' },
  price_btc: { type: Number, label: 'Price in BTC' },
  volume_usd_24h: { type: Number, label: '24h volume in USD' },
  market_cap_usd: { type: Number, label: 'total market cap' },
  available_supply: { type: Number, label: 'Available supply' },
  total_supply: { type: Number, label: 'Total supply' },
  max_supply: { type: Number, label: 'Maximum supply' },
  percent_change_1h: { type: Number, label: 'Percent change 1h' },
  percent_change_24h: { type: Number, label: 'Percent change 24h' },
  percent_change_7d: { type: Number, label: 'Percent change 7d' },
  percent_change_last: { type: Number, label: 'Percent change last', optional: true },
  last_updated: { type: Date, label: 'Last Updated' },
});

Prices.attachSchema(Prices.schema);

export default Prices;
