var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Widget = require('./app/models/widget');

// Configure app to use BodyParser to make working with POSTs easier
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:32017/widget');

var port = process.env.PORT || 8080;

// Set up routes
var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Widget API!' });
});

// Register routes
app.use('/api/', router);

// Start server
app.listen(port);
console.log("Listening on port " + port);
