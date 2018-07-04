const mongoose = require('mongoose')

var Booking = mongoose.model('Booking', {
    labId    : { type: String },
    reason   : { type: String },
    name     : { type: String },
    date     : { type: String },
    startTime: { type: String },
    endTime  : { type: String},
    status   : { type: String }
})

module.exports = { Booking }