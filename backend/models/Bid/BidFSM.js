var StateMachine = require('javascript-state-machine');

var FSM = require('../Base/FSM');
var Role = require('../user/User').Role;
var BidModel = require('./Bid').BidModel;
var BidStatus = require('./Bid').BidStatus;
var BidTransition = require('./Bid').BidTransition;

var BidFSM = FSM.createFSM({
    init: BidStatus.keys[BidStatus.unreview],
    transitions: [
        { 
            name: BidTransition.keys[BidTransition.edit], 
            from: BidStatus.keys[BidStatus.unreview], 
            to: BidStatus.keys[BidStatus.editing],
            role: [
                Role.keys[Role.owner]
            ]
        },
        { 
            name: BidTransition.keys[BidTransition.save], 
            from: BidStatus.keys[BidStatus.editing],
            to: BidStatus.keys[BidStatus.unreview],
            role: [
                Role.keys[Role.owner]
            ]  
        },
        {
            name: BidTransition.keys[BidTransition.cancel],
            from: BidStatus.keys[BidStatus.editing],
            to: BidStatus.keys[BidStatus.unreview],
            role: [
                Role.keys[Role.owner]
            ]
        },
        {
            name: BidTransition.keys[BidTransition.yes],
            from: BidStatus.keys[BidStatus.unreview],
            to: BidStatus.keys[BidStatus.agree],
            role: [
                Role.keys[Role.salerassistant]
            ]
        },
        {
            name: BidTransition.keys[BidTransition.no],
            from: BidStatus.keys[BidStatus.unreview],
            to: BidStatus.keys[BidStatus.deny],
            role: [
                Role.keys[Role.salerassistant]
            ]
        },
        {
            name: BidTransition.keys[BidTransition.modify],
            from: BidStatus.keys[BidStatus.deny],
            to: BidStatus.keys[BidStatus.editing],
            role: [
                Role.keys[Role.owner]
            ]
        }
    ],
    data: (_data) => {
        return { data: _data };
    },
    methods: {
        onEdit: (cycle, _id, obj) => {
            return BidModel.findByIdAndUpdate(_id, { _status: cycle.to }).exec();
        },
        onCancel: (cycle, _id, obj) => {
            return BidModel.findByIdAndUpdate(_id, { _status: cycle.to }).exec();
        },
        onSave: (cycle, _id, bid) => {
            bid["_status"] = cycle.to;
            return BidModel.findByIdAndUpdate(_id, bid).exec();
        },
        onYes: (cycle, _id, obj) => {
            return BidModel.findByIdAndUpdate(_id, {
                 _status: cycle.to,
                result: obj.result,
                yes_time: new Date() }).exec();
        },
        onNo: (cycle, _id, obj) => {
            return BidModel.findByIdAndUpdate(_id, {
                _status: cycle.to,
               deny_reason: obj.reason,
               yes_time: new Date() }).exec();
        },
        onModify: (cycle, _id, obj) => {
            return BidModel.findByIdAndUpdate(_id, { _status: cycle.to }).exec();            
        }
    }
});

module.exports.Instance = function(data) {
    if(data._id) {
        return BidModel.findById(data._id).exec().then(
            (bid) => {
                // Set FSM to status
                let fsm = new BidFSM(bid.$toObject());
                if (bid._status && fsm.state != bid._status)
                    fsm.goto(bid._satus);
                fsm.data.nextAction = fsm.nextAction();
                return Promise.resolve(fsm);
            }, (error) => {
                return Promise.reject(err);
            }
        );
    } else {
        data._satus = BidStatus.keys[BidStatus.unreview];
        return BidModel.create(data).then(function(bid) {
            if(!bid) {
                return Promise.reject(err);                    
            }
            else {
                let fsm = new BidFSM(bid.$toObject());
                fsm.data.nextAction = fsm.nextAction();
                return Promise.resolve(fsm);
            }
        });
    }
};

module.exports.Status = BidStatus;
module.exports.FSM = BidFSM;