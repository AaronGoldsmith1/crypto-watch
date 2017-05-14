const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let listSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coin',
    required: true
  }]
})

let List = mongoose.model('List', listSchema)

module.exports = List;
