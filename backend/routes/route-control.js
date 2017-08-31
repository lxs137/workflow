var express = require('express');
var router = express.Router();

var BidCtrl = require('../controllers/BidCtrl');

router.post('/bid', BidCtrl.createBid);

module.exports = router;
