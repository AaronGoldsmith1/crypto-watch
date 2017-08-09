const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const listsRouter = express.Router();

const token = require('./token_auth');
const usersController = require('../controllers/users');
const listsController = require('../controllers/lists')

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Crypto Watch'
  });
});

listsRouter.route('/:id')
  .get(listsController.show)

listsRouter.route('/search/:name')
  .get(listsController.findCoins)

listsRouter.route('/:id/coins')
  .post(listsController.addCoin)

listsRouter.route('/:id/coins')
  .put(listsController.update)

listsRouter.route('/:id/coins')
  .delete(listsController.removeCoin)

usersRouter.route('/')
  .post(usersController.create)

// router.route('/api/token')
  //   .post(token.create)

usersRouter.route('/me')
  .get(usersController.me)

module.exports = {
  users: usersRouter,
  lists: listsRouter,
  other: router
}
