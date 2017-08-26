var StateMachine = require('javascript-state-machine');

var FSM = require('../Base/FSM');
var BidModel = require('./Bid').BidModel;
var BidStatus = require('./Bid').BidStatus;
var BidTransition = require('./Bid').BidTransition;

var BidFSM = FSM.createFSM({
    init: BidStatus.keys[BidStatus.unreview],
    transitions: [
        { 
            name: BidTransition.keys[BidTransition.edit], 
            from: BidStatus.keys[BidStatus.unreview], 
            to: BidStatus.keys[BidStatus.editing]  
        },
        { 
            name: BidTransition.keys[BidTransition.save], 
            from: BidStatus.keys[BidStatus.editing],
            to: BidStatus.keys[BidStatus.unreview]  
        },
        {
            name: BidTransition.keys[BidTransition.yes],
            from: BidStatus.keys[BidStatus.unreview],
            to: BidStatus.keys[BidStatus.agree]
        },
        {
            name: BidTransition.keys[BidTransition.no],
            from: BidStatus.keys[BidStatus.unreview],
            to: BidStatus.keys[BidStatus.deny]
        },
        {
            name: BidTransition.keys[BidTransition.modify],
            from: BidStatus.keys[BidStatus.deny],
            to: BidStatus.keys[BidStatus.editing]
        }
    ],
    data: (_data) => {
        return { data: _data };
    }
});

module.exports.Instance = function(data) {
    if(data._id) {
        return BidModel.findById(data._id, function(err, bid) {
            if(err) {
                return Promise.reject(err);
            } else {
                // Set FSM to status
                let fsm = new BidFSM(data);
                fsm.goto(data._satus);
                return Promise.resolve(fsm);
            }
        }).exec();
    } else {
        data._satus = BidStatus.keys[BidStatus.unreview];
        return BidModel.create(data).then(function(bid) {
            if(!bid) {
                return Promise.reject(err);                    
            }
            else {
                let fsm = new BidFSM(data);
                fsm.data.nextActions = fsm.transitions();
                fsm.data.nextStatus = fsm.nextStatus();
                return Promise.resolve(fsm);
            }
        });
    }
};

module.exports.Status = BidStatus;
module.exports.FSM = BidFSM;