var BidModel = require('../models/Bid/Bid').BidModel;
var BidFSM = require('../models/Bid/BidFSM');
var eventproxy = require('eventproxy');

module.exports.getBids = function(req, res) {
  BidModel.find(req.query).exec(function(err, bids) {
    if(err) {
      return res.status(400).send("err in get /bids");
    } else {
      return res.status(200).json(bids);
    }
  });
};

module.exports.getBidDetail = function(req, res) {
  var _id = req.params._id;
  BidFSM.Instance({ _id: _id }).then((fsm) => {
    console.log(fsm);
    res.status(200).json(fsm.data);
  }, (error) => {
    console.log(error);
    res.status(400).send(error);
  });
}