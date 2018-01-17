import { HTTP } from 'meteor/http';
import Prices from '../../api/Prices/Prices';

const api = 'https://api.coinmarketcap.com/v1/ticker/?limit=';
const limit = 2000; // the top 2000 currencies. As of this writing the API returns 1442
const url = `${api}${limit}`;

SyncedCron.add({
  name: 'Poll coinmarketcap API every 5 minutes',
  schedule(parser) {
    return parser.text('every 5 minutes');
  },
  job() {
    HTTP.get(url, (err, response) => {
      if (!err) {
        response.data.forEach((el) => {
          if (el.market_cap_usd) {
            const price = { id: el.id, name: el.name, symbol: el.symbol };
            price.rank = parseInt(el.rank, 10);
            price.price_usd = parseFloat(el.price_usd);
            price.price_btc = parseFloat(el.price_btc);
            price.volume_usd_24h = parseFloat(el['24h_volume_usd']) ? parseFloat(el['24h_volume_usd']) : 0;
            price.market_cap_usd = parseFloat(el.market_cap_usd);
            price.available_supply = parseFloat(el.available_supply);
            price.total_supply = parseFloat(el.total_supply);
            price.max_supply = parseFloat(el.max_supply) ? parseFloat(el.max_supply) : 0;
            price.percent_change_1h = parseFloat(el.percent_change_1h) ? parseFloat(el.percent_change_1h) : 0;
            price.percent_change_24h = parseFloat(el.percent_change_24h) ? parseFloat(el.percent_change_24h) : 0;
            price.percent_change_7d = parseFloat(el.percent_change_7d) ? parseFloat(el.percent_change_7d) : 0;
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
