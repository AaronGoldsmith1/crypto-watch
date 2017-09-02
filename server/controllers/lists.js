const User = require('../models/User');
const Coin = require('../models/Coin');
const mongoose = require('mongoose');

function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    if (user.list.length === 0) {
      res.json(user.list)
    } else {
      const coinData = [];
      user.list.forEach((coin) => {
        //use coin id string to find document in DB
        Coin.findOne({
          id: coin.id
        }, function(err, foundCoin) {
          if (err) return console.log(err)
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
    }
  })
}


function findCoins({params}, res, next) {
  Coin.find(
    {
      name: {
        "$regex": params.name,
        "$options": "i"
      }
    },
    (err, docs) => {
      if (err) {
        console.log(err)
      } else {
        res.json(docs)
      }
    });
}

function addCoin({params, body}, res, next) {
  let indexOfCoin;
  User.findById(params.id, (err, user) => {
    if (err) return console.log(err)
    Coin.findOne({
      id: body.coinId
    }, (err, {id}) => {
      // use indexOf
      for (let i = 0; i < user.list.length; i++) {
        if (user.list[i].id === id) {
          indexOfCoin = i;
        }
      }
      if (indexOfCoin !== user.list.length - 1) {
        user.list.push({
          id: id,
          amount_owned: 0
        })
      }
      user.save((err, list) => {
        if (err) return console.log(err)
        res.json(user.list)
      })
    })
  })
}

function update({params, body}, res, next) {
  User.findOne({
    _id: params.id
  }, (err, user) => {
    if (err) console.log(err)
    user.list.forEach((coin) => {
      if (coin.id === body.coinId) {
        coin.amount_owned = body.amount_owned
      }
      user.save((err, {list}) => {
        if (err) console.log(err)
        res.json(list)
      })
    })
  })
}

function removeCoin({params, body}, res, next) {
  User.findById(params.id, (err, user) => {
    if (err) return console.log(err)
    Coin.findOne({
      id: body.coinId
    }, (err, {id}) => {
      if (err) return console.log(err)
      for (let i = 0; i < user.list.length; i++) {
        if (user.list[i].id === id) {
          user.list.splice(user.list.indexOf(i), 1)
        }
      }
      user.save({
        new: true,
        safe: true
      }, (err, {list}) => {
        if (err) return console.log(err)
        res.json(list)
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
