var BidModel = require('../models/Bid/Bid').BidModel;
var BidFSM = require('../models/Bid/BidFSM');
var eventproxy = require('eventproxy');

module.exports.createBid = function(req, res) {
  BidFSM.Instance(req.body).then((fsm) => {
    res.status(200).json(fsm.data);
  }, (error) => {
    res.status(400).send(error);
  });
};

module.exports.bidAction = function(req, res) {
  let _id = req.params._id, action = req.body.action;  
  BidFSM.Instance({ _id: _id }).then((fsm) => {
    fsm[action](_id, req.body).then((bid) => {
      res.status(200).json(bid.$toObject());
    }, (error) => {
      res.status(400).send(error);
    });
  }, (error) => {
    res.status(400).send(error);
  })
}