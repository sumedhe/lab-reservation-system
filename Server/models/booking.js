const mongoose = require('mongoose')

var Booking = mongoose.model('Booking', {
    labId    : { type: String },
    reason   : { type: String },
    name     : { type: String },
    startTime: { type: Date },
    endTime  : { type: Date},
    status   : { type: String }
})

module.exports = { Booking }