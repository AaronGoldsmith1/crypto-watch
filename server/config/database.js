const mongoose = require('mongoose');
const request = require('request')
const Coin = require('../models/Coin');
const moment = require('moment')
const ObjectId = require('mongodb').ObjectID;

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

function lessThanFiveMinAgo(date) {
  return moment(date).isAfter(moment().subtract(5, 'minutes'));
}

ObjectId.prototype.getTimestamp = function() {
  return new Date(parseInt(this.toString().slice(0, 8), 16) * 1000);
}

mongoose.connect(dbUri);
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbUri);



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
        rank: marketCoin.rank,
        price_usd: marketCoin.price_usd,
        price_btc: marketCoin.price_btc,
        daily_volume_usd: marketCoin.daily_volume_usd,
        market_cap_usd: marketCoin.market_cap_usd,
        available_supply: marketCoin.available_supply,
        total_supply: marketCoin.total_supply,
        percent_change_1h: marketCoin.percent_change_1h,
        percent_change_24h: marketCoin.percent_change_24h,
        percent_change_7d: marketCoin.percent_change_7d,
      }

      Coin.create(coinToSave, (err, coinToSave) => {
        if (err) return console.log(err)
      })

    })

  });
});






module.exports = mongoose;
