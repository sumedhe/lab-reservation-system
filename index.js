const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db.js')

var app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server is running at port 3000"));