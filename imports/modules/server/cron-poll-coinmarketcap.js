import { HTTP } from 'meteor/http';
import Prices from '../../api/Prices/Prices';
import LatestPrices from '../../api/LatestPrices/LatestPrices';

const api = 'https://api.coinmarketcap.com/v1/ticker/?limit=';
const limit = 2000; // the top 2000 currencies. As of this writing the API returns 1442
const url = `${api}${limit}`;
const minMarketCap = 50000000; // only track currencies worth over $50M

SyncedCron.add({
  name: 'Poll coinmarketcap API every 3 minutes',
  schedule(parser) {
    return parser.text('every 3 minutes');
  },
  job() {
    HTTP.get(url, (err, response) => {
      if (!err) {
        // use bulk upserts, see https://forums.meteor.com/t/bulk-upsert-issue-with-mongo-id-solved/31807
        const Bulk1 = Prices._collection.rawCollection().initializeUnorderedBulkOp();
        const Bulk2 = LatestPrices._collection.rawCollection().initializeUnorderedBulkOp();
        let hasUpdates = false;

        response.data.forEach((el) => {
          if (el.market_cap_usd) {
            const price = { id: el.id, name: el.name, symbol: el.symbol };
            price.market_cap_usd = parseFloat(el.market_cap_usd);

            if (price.market_cap_usd >= minMarketCap) {
              price.rank = parseInt(el.rank, 10);
              price.price_usd = parseFloat(el.price_usd);
              price.price_btc = parseFloat(el.price_btc);
              price.volume_usd_24h = parseFloat(el['24h_volume_usd']) ? parseFloat(el['24h_volume_usd']) : 0;
              price.available_supply = parseFloat(el.available_supply);
              price.total_supply = parseFloat(el.total_supply);
              price.max_supply = parseFloat(el.max_supply) ? parseFloat(el.max_supply) : 0;
              price.percent_change_1h = parseFloat(el.percent_change_1h) ? parseFloat(el.percent_change_1h) : 0;
              price.percent_change_24h = parseFloat(el.percent_change_24h) ? parseFloat(el.percent_change_24h) : 0;
              price.percent_change_7d = parseFloat(el.percent_change_7d) ? parseFloat(el.percent_change_7d) : 0;
              price.last_updated = new Date(parseFloat(el.last_updated * 1000));

              const previousPrice = Prices.findOne({ id: price.id }, { sort: { last_updated: -1 } });

              if (previousPrice && (price.last_updated > previousPrice.last_updated)) {
                price.percent_change_last = (100 * (price.price_usd - previousPrice.price_usd)) /
                previousPrice.price_usd;
                price.percent_change_last = Math.round(parseFloat(Math.round(price.percent_change_last * 100))) / 100;
              }

              if (!previousPrice || (price.last_updated > previousPrice.last_updated)) {
                hasUpdates = true;
                Bulk1.insert(price);
                Bulk2.find({ id: price.id }).removeOne();
                Bulk2.insert(price); // because upsert just won't work here for some reason
              }
            }
          }
        });

        if (hasUpdates) {
          Bulk1.execute((execErr, result) => {
            if (result) console.log(`${result.nInserted} prices updated`);
          });
          Bulk2.execute((execErr) => {
            if (execErr) console.log(execErr);
          });
        }
      } else console.log(err);
    });
  },
});

SyncedCron.start();
