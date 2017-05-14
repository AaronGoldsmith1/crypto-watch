const User = require('../models/User');
const List = require('../models/List');
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
  })

  let mongoId = new mongoose.Types.ObjectId(req.body.coinId)
  user.list.coins.push(req.body.coinId)
  user.list.save(function(err, playlist) {
    if (err) return console.log(err)
    res.json(playlist)
  })

}

function removeCoin(req, res, next) {
  List.findById(req.params.id, function(err, list) {
    if (err) return console.log(err)
  })

  list.coins = _.remove(list.coins, req.params.coinId);
  list.save({
    new: true,
    safe: true
  }, function(err, list) {
    if (err) return console.log(err)
    res.json(list)
  })

}

module.exports = {
  show: show,
  addCoin: addCoin,
  removeCoin: removeCoin,
};
