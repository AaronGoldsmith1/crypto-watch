const Coin = require('../models/Coin');
const mongoose = require('mongoose')

function update(req, res, next) {
  Coin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    safe: true
  },
    function(err, coin) {
      coin.amount_owned = req.body.amount_owned
      if (err) return console.log(err)
      res.json(coin)
    })
}

module.exports = {
  update: update
}
