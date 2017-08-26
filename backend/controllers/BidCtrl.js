var Bid = require('../models/Bid/Bid');
var BidFSM = require('../models/Bid/BidFSM');
var eventproxy = require('eventproxy');

module.exports.createBid = function(req, res) {
  let ep = new eventproxy();
  BidFSM.Instance(req.body).then((fsm) => {
    console.log(fsm);
  });
};