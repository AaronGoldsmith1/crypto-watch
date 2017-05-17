const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coin = require('../models/Coin')
const coinSchema = Coin.schema


let userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  list: [coinSchema]
})

// add bcrypt hashing to model (works on a password field)!
// adds password digest
userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

let User = mongoose.model('User', userSchema);
module.exports = User;
