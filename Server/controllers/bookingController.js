const express = require('express')
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var { Booking } = require('../models/booking');

// List all bookings
router.get('/', (req, res) => {
    Booking.find( (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// List all bookings
router.get('/bydate/:date', (req, res) => {
    console.log(req.params.date)
    Booking.find({date: req.params.date}, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// Find user by id
router.get('/:id', (req, res) => {
    res.send(req.params.id)
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("No records with given id : " + res.params.id)
    }

    Booking.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// Create new booking
router.post('/', (req, res) => {
    console.log('xxx' + req.body.date)
    var booking = new Booking({
        labId     : req.body.labId,
        reason    : req.body.reason,
        name      : req.body.name,
        date      : req.body.date,
        startTime : req.body.startTime,
        endTime   : req.body.endTime,
        status    : req.body.status
    });

    // Check for time conflicts

    booking.save((err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// Update booking
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("No records with given id : " + req.params.id)
    } 

    var booking = {
        labId     : req.body.labId,
        reason    : req.body.reason,
        name      : req.body.name,
        date      : req.body.date,
        startTime : req.body.startTime,
        endTime   : req.body.endTime,
        status    : req.body.status
    }

    Booking.findByIdAndUpdate(req.params.id, { $set: booking }, { new: false }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })

})

// Delete booking by id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("No records with given id : " + req.params.id)
    } 

    Booking.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Booking save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})


module.exports = router
