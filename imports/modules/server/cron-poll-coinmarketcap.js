import { HTTP } from 'meteor/http';
import Prices from '../../api/Prices/Prices';

const api = 'https://api.coinmarketcap.com/v1/ticker/?limit=';
const limit = 2000; // the top 2000 currencies. As of this writing the API returns 1442
const url = `${api}${limit}`;

SyncedCron.add({
  name: 'Poll coinmarketcap API every minute',
  schedule(parser) {
    return parser.text('every 1 minute');
  },
  job() {
    HTTP.get(url, (err, response) => {
      if (!err) {
        response.data.forEach((el) => {
          if (el.market_cap_usd) {
            const price = { id: el.id, name: el.name, symbol: el.symbol };
            price.rank = parseInt(el.rank);
            price.price_usd = parseFloat(el.price_usd);
            price.price_btc = parseFloat(el.price_btc);
            if (el['24h_volume_usd']) price.volume_usd_24h = parseFloat(el['24h_volume_usd']);
            price.market_cap_usd = parseFloat(el.market_cap_usd);
            price.available_supply = parseFloat(el.available_supply);
            price.total_supply = parseFloat(el.total_supply);
            if (el.max_supply) price.max_supply = parseFloat(el.max_supply);
            if (el.percent_change_1h) price.percent_change_1h = parseFloat(el.percent_change_1h);
            if (el.percent_change_24h) price.percent_change_24h = parseFloat(el.percent_change_24h);
            if (el.percent_change_7d) price.percent_change_7d = parseFloat(el.percent_change_7d);
            price.last_updated = new Date(parseFloat(el.last_updated * 1000));
            Prices.upsert({ id: price.id, last_updated: price.last_updated }, { $set: price });
          }
        });
        console.log(Prices.find().count());
      } else console.log(err);
    });
  },
});

SyncedCron.start();
