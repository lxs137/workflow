var BidModel = require('../models/Bid/Bid').BidModel;
var BidFSM = require('../models/Bid/BidFSM');
var eventproxy = require('eventproxy');

module.exports.createBid = function(req, res) {
  var ep = new eventproxy();
  BidFSM.Instance(req.body).then((fsm) => {
    res.status(200).json(fsm.data);
  }, (error) => {
    res.status(400).send(error);
  });
};

module.exports.bidAction = function(req, res) {
  
}