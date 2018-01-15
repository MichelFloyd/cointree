import { HTTP } from 'meteor/http';

const api = 'https://api.coinmarketcap.com/v1/ticker/?limit=';
const limit = 2000;
const url = `${api}${limit}`;

SyncedCron.add({
  name: 'Poll coinmarketcap API every 30 seconds',
  schedule(parser) {
    return parser.text('every 30 seconds');
  },
  job() {
    HTTP.get(url, (err, response) => {
      if (!err) {
        response.data.forEach((el, i) => {
          if (i < 10) console.log(`Symbol: ${el.symbol} price (USD): ${el.price_usd}`);
        });
      } else console.log(err);
    });
    return true;
  },
});

SyncedCron.start();
