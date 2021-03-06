var mongoose = require('mongoose');
var Enum = require('../Base/Enum');

var BidStatus = Enum("unreview", "editing", "agree", "deny");
var BidTransition = Enum("edit", "save", "cancel", "yes", "no", "modify");

var BidSchema = new mongoose.Schema({
    _status: {
        type: String,
        enum: BidStatus.all,
        require: true,
        default: BidStatus.keys[BidStatus.unreview]
    },
    name: String,
    saler: String,
    create_time: {
        type: Date,
        default: Date.now
    },
    client: String,
    result: String,
    deny_reason: String,
    yes_time: Date,
    deny_time: Date
});

module.exports.BidStatus = BidStatus;
module.exports.BidTransition = BidTransition;
module.exports.BidModel = mongoose.model('BidModel', BidSchema);