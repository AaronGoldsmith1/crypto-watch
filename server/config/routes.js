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


usersRouter.route('/')
  .post(usersController.create)

router.route('/api/token')
  .post(token.create)

usersRouter.route('/me')
  .get(token.authenticate, usersController.me)

module.exports = {
  users: usersRouter,
  lists: listsRouter,
  other: router
}
