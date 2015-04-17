var express = require('express');
var router = express.Router();

router.get('/wishlist', function(req, res, next) {
  res.render('wishlist',{ message: '' });
});

module.exports = router;
