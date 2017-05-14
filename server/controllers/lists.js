const User = require('../models/User');
const Coin = require('../models/Coin')
const _ = require('lodash');
const mongoose = require('mongoose')


function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    res.json(user.list)
  })
}

function addCoin(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    Coin.findById(req.body.coinId, function(err, coin) {
      // if (user.list.indexOf(coin) === -1) {
      user.list.push(coin)
      // }
      //TODO: Prevent adding duplicates to list
      user.save(function(err, list) {
        if (err) return console.log(err)
        res.json(user.list)
      })
    })
  })
}

function removeCoin(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    Coin.findById(req.params.coinId, function(err, coin) {
      user.list.splice(user.list.indexOf(coin), 1)
      // user.list = _.remove(user.list, req.params.coinId);
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
  addCoin: addCoin,
  removeCoin: removeCoin,
};
