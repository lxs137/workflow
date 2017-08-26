var mongoose = require('mongoose');

var BidSchema = new mongoose.Schema({
    _status: {
        type: String,
        enum: []
    }
});

module.exports = mongoose.model('Bid', BidSchema);