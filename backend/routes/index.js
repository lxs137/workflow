var express = require('express');
var router = express.Router();

var BidCtrl = require('../controllers/BidCtrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/bid', BidCtrl.createBid);

module.exports = router;
