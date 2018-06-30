const express = require('express')
var router = express.Router();

var { Booking } = require('../models/booking');

// List all bookings
router.get('/', (req, res) => {
    Booking.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in retrieving Bookings : " + JSON.stringify(err, undefined, 2))
        }
    })
})

// Create new booking
router.post('/', (req, res) => {
    var booking = new Booking({
        labId     : req.body.labId,
        reason    : req.body.reason,
        name      : req.body.name,
        startTime : req.body.startTime,
        endTime   : req.body.endTime,
        status    : req.body.status
    });

    booking.save((err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router
