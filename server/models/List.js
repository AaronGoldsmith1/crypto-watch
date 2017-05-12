const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new mongoose.Schema({
  coin: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coin'
  }],
  total_dollar_balance: {
    type: Number,
    default: 0
  }
})

let List = mongoose.model('List', listSchema)

module.exports = List;
