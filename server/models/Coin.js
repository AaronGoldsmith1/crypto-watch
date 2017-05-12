const mongoose = require('mongoose')
const Schema = mongoose.Schema


let coinSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  symbol: {
    type: String
  },
  rank: {
    type: Number
  },
  price_usd: {
    type: Number
  },
  price_btc: {
    type: Number
  },
  daily_volume_usd: {
    type: Number
  },
  market_cap_usd: {
    type: Number
  },
  available_supply: {
    type: Number
  },
  total_supply: {
    type: Number
  },
  percent_change_1h: {
    type: Number
  },
  percent_change_24h: {
    type: Number
  },
  percent_change_7d: {
    type: Number
  },
  amount_owned: {
    type: Number
  },
  current_dollar_balance: {
    type: Number
  }
}, {
  timestamps: true
})

let Coin = mongoose.model('Coin', coinSchema)

module.exports = Coin;
