var express = require('express');
var router = express.Router();

var BidCtrl = require('../controllers/BidCtrl');

router.post('/bid', BidCtrl.createBid);
router.post('/bid/action/:_id', BidCtrl.bidAction);

module.exports = router;
