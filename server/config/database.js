const mongoose = require('mongoose');
const request = require('request')

// Use different database URIs based on whether an env var exists.
let dbUri = process.env.MONGODB_URI ||
  'mongodb://localhost/' + process.env.LOCAL_DB;

if (!process.env.MONGODB_URI) {
  // check that MongoD is running...
  require('net').connect(27017, 'localhost').on('error', () => {
    console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
    process.exit(0);
  });
}
console.log("Connect to mongo", dbUri);
mongoose.connect(dbUri);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbUri);
  request.get('https://api.coinmarketcap.com/v1/ticker/', function(err, res, body) {
    if (err) {
      throw err
    }
    let myData = JSON.parse(body)

    myData.forEach(function(coin) {
      console.log(coin.name)
    })




  });
});






module.exports = mongoose;
