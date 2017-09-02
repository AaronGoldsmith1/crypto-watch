const mongoose = require('mongoose');
const request = require('request')
const Coin = require('../models/Coin');
const ObjectId = require('mongodb').ObjectID;
var CronJob = require('cron').CronJob;

process.env.LOCAL_DB = process.env.LOCAL_DB || 'crypto-watch';

// Use different database URIs based on whether an env var exists.
let dbUri = process.env.MONGODB_URI ||
  'mongodb://localhost/' + process.env.LOCAL_DB;

if (!process.env.MONGODB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', () => {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}

function fetchData() {
  Coin.remove({}, function(err, row) {
    if (err) {
      console.log("Collection couldn't be removed" + err);
      return;
    }
    request.get('https://api.coinmarketcap.com/v1/ticker/', function(err, res, body) {
      if (err) {
        throw err
      }
      let myData = JSON.parse(body)
      myData.forEach(function(marketCoin) {
        let coinToSave = {
          id: marketCoin.id,
          name: marketCoin.name,
          symbol: marketCoin.symbol,
          price_usd: marketCoin.price_usd,
          market_cap_usd: marketCoin.market_cap_usd,
          percent_change_24h: marketCoin.percent_change_24h
        }
        Coin.create(coinToSave, (err, coinToSave) => {
          if (err) return console.log(err)
        })
      })
    });
  })
}

mongoose.connect(dbUri);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${dbUri}`);
  fetchData()
  const job = new CronJob('00 * * * * *', () => {
    console.log('cronjob running...')
    fetchData()
  }, null, true, 'America/Los_Angeles')
});

module.exports = mongoose;
