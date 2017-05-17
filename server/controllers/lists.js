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
  let indexOfCoin;
  User.findById(req.params.id, function(err, user) {
    if (err) return console.log(err)
    Coin.findOne({
      id: req.body.coinId
    }, function(err, coin) {
      for (let i = 0; i < user.list.length; i++) {
        if (user.list[i].id !== coin.id) {
          indexOfCoin = i;
        }
      }
      if (indexOfCoin === user.list.length - 1) {
        coin._id = mongoose.Types.ObjectId()
        coin.isNew = true;
        user.list.push(coin)
      }
      user.save(function(err, list) {
        if (err) return console.log(err)
        res.json(user.list)
      })
    })
  })
}
//use .update
function update(req, res, next) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) return console.log(err)
    for (let i = 0; i < user.list.length; i++) {
      console.log('user.list[i].id:', user.list[i].id)
      console.log('req.body.coinId:', req.body.coinId)
      if (user.list[i].id === req.body.coinId) {
        //NOT SAVING TO DB
        user.list[i].amount_owned = req.body.amount_owned
        console.log('GOTTA UPDATE', user.list[i])
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
      console.log(coin)
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
  addCoin: addCoin,
  update: update,
  removeCoin: removeCoin,
};
