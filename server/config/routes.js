const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const listsRouter = express.Router();

const usersController = require('../controllers/users');
const listsController = require('../controllers/lists')

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Crypto Watch'
  });
});

//show all coins for single user
listsRouter.route('/:id')
  .get(listsController.show)

//search for coin in UI and populate results wtih regex
listsRouter.route('/search/:name')
  .get(listsController.findCoins)

//add single coin to user's list
listsRouter.route('/:id/coins')
  .post(listsController.addCoin)

//update amount_owned field for single coin for user
listsRouter.route('/:id/coins')
  .put(listsController.update)

//delete coin from user list
listsRouter.route('/:id/coins')
  .delete(listsController.removeCoin)

//create new user
usersRouter.route('/')
  .post(usersController.create)

//authenticate user
usersRouter.route('/me')
  .get(usersController.me)

module.exports = {
  users: usersRouter,
  lists: listsRouter,
  other: router
}
