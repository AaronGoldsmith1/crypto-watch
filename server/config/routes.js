const express = require('express');
const router = express.Router();
const usersRouter = express.Router();
const listsRouter = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Crypto Watch'
  });
});


module.exports = {
  users: usersRouter,
  lists: listsRouter,
  other: router
}
