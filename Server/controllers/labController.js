const express = require('express')
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var { Lab } = require('../models/lab');

// List all labs
router.get('/', (req, res) => {
    Lab.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Lab save : " + JSON.stringify(err, undefined, 2))
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

    Lab.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Lab save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// Create new lab
router.post('/', (req, res) => {
    var lab = new Lab({
        labId     : req.body.labId,
        reason    : req.body.reason,
        name      : req.body.name,
        startTime : req.body.startTime,
        endTime   : req.body.endTime,
        status    : req.body.status
    });

    // Check for time conflicts

    lab.save((err, doc) => {
        if (!err){
            res.send(doc);
        } else {
            console.log("Error in Lab save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})

// Update lab
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("No records with given id : " + req.params.id)
    } 

    var lab = {
        labId     : req.body.labId,
        reason    : req.body.reason,
        name      : req.body.name,
        startTime : req.body.startTime,
        endTime   : req.body.endTime,
        status    : req.body.status
    }

    Lab.findByIdAndUpdate(req.params.id, { $set: lab }, { new: false }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Lab save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })

})

// Delete lab by id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("No records with given id : " + req.params.id)
    } 

    Lab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Lab save : " + JSON.stringify(err, undefined, 2))
            res.status(400).send(JSON.stringify(err, undefined, 2));
        }
    })
})


module.exports = router
