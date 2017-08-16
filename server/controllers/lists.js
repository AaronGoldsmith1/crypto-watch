const User = require('../models/User');
const Coin = require('../models/Coin');
const mongoose = require('mongoose');

function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    const coinData = [];

    user.list.forEach((coin) => {
      //use coin id string to find document in DB
      Coin.findOne({
        id: coin.id
      }, function(err, foundCoin) {

        coinData.push({
          'id': coin.id,
          'amount_owned': coin.amount_owned,
          'market_cap_usd': foundCoin.market_cap_usd,
          'name': foundCoin.name,
          'symbol': foundCoin.symbol,
          'price_usd': foundCoin.price_usd,
          'percent_change_24h': foundCoin.percent_change_24h
        });
        if (coinData.length == user.list.length) {
          res.json(coinData)
        }
      })
    })
  })
}

function findCoins(req, res, next) {
  Coin.find(
    {
      "name": {
        "$regex": req.params.name,
        "$options": "i"
      }
    },
    function(err, docs) {
      res.json(docs)
    });
}

function addCoin(req, res, next) {
  let indexOfCoin;
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    Coin.findOne({
      id: req.body.coinId
    }, function(err, coin) {

      // use indexOf
      for (let i = 0; i < user.list.length; i++) {
        if (user.list[i].id === coin.id) {
          indexOfCoin = i;
        }
      }
      if (indexOfCoin !== user.list.length - 1) {
        //create copy of coin to add
        user.list.push({
          id: coin.id,
          amount_owned: 0
        })
      }
      user.save(function(err, list) {
        if (err) return console.log(err)
        res.json(user.list)
      })
    })
  })
}

function update(req, res, next) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) return console.log(err)
    for (let i = 0; i < user.list.length; i++) {
      if (user.list[i].id === req.body.coinId) {
        user.list[i].amount_owned = req.body.amount_owned
        user.save(function(err, user) {
          if (err) return console.log(err)
          res.json(user.list)
        })
      }
    }
  })
}

function removeCoin(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    Coin.findOne({
      id: req.body.coinId
    }, function(err, coin) {
      if (err) return console.log(err)
      for (let i = 0; i < user.list.length; i++) {
        if (user.list[i].id === coin.id) {
          user.list.splice(user.list.indexOf(i), 1)
        }
      }
      user.save({
        new: true,
        safe: true
      }, function(err, user) {
        if (err) return console.log(err)
        res.json(user.list)
      })
    })
  })
}

module.exports = {
  show: show,
  findCoins: findCoins,
  addCoin: addCoin,
  update: update,
  removeCoin: removeCoin,
};
