const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  }]
})





let User = mongoose.model('User', userSchema);
module.exports = User;
