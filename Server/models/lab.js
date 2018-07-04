const mongoose = require('mongoose')

var Lab = mongoose.model('Lab', {
    // _id      : { type: String },
    name     : { type: String },
})

module.exports = { Lab }