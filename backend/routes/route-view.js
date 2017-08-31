var express = require('express');
var router = express.Router();

var bidAPI = require('../api/api-bid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bid/:_id', bidAPI.getBidDetail);
router.get('/bids', bidAPI.getBids);

module.exports = router;