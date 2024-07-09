var express = require('express');
var router = express.Router();
/* GET user listing. */
router.get('/', function(req, res, next) {
  res.render('user', {message: 'Hello!'});
});

module.exports = router;
