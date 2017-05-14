const User = require('../models/User');
const List = require('../models/List');
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
      // coin._id = new ObjectId()

      user.list.push(coin)
      console.log(user.list)

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


    user.list = _.remove(user.list, req.params.coinId);
    list.save({
      new: true,
      safe: true
    }, function(err, list) {
      if (err) return console.log(err)
      res.json(list)
    })
  })
}

module.exports = {
  show: show,
  addCoin: addCoin,
  removeCoin: removeCoin,
};
