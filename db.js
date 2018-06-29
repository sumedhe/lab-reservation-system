const mongoose = require('mongoose')

// Database connect
mongoose.connect('mongodb://localhost:27017/lab-reservation-system', (err) => {
    if (!err) {
        console.log("Mongodb connection succeeded")
    } else {
        console.log("Error in db connection " + JSON.stringify(err, undefined, 2))
    }
});

module.exports = mongoose;