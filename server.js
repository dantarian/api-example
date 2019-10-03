// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Widget = require('./app/models/widget');

// Configure app to use BodyParser to make working with POSTs easier
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongo configuration
const mongoURL = "mongodb://localhost:27017/widgets"
const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to MongoDB database
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, mongoConfig, function (err, db) {
    if (err) {
        console.log("Database connection failed: " + err);
    } else {
        console.log("Connected to database!");
    }
});

const port = process.env.PORT || 8080;

// Set up routes
const router = express.Router();

// Request logging
router.use(function(req, res, next) {
    console.log("Request received: " + req.originalUrl);
    next();
});

// Simple route to check API is up and running
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the Widget API!' });
});

// Widget routes
router.route("/widgets")
    .get(function(req, res) {
        Widget.find(function(err, widgets) {
            if (err) res.send(err);
            res.json(widgets);
        });
    })
    .post(function(req, res) {
        const widget = new Widget({ name: req.body.name });

        widget.save(function(err) {
            if (err) res.send(err);
            res.json({ message: "Widget created!" });
        });
    });

router.route("/widgets/:widget_id")
    .get(function(req, res) {
        Widget.findById(req.params.widget_id, function(err, widget) {
            if (err) res.send(err);
            console.log(JSON.stringify(widget));
            if (widget) {
                res.json(widget);
            } else {
                res.status(404).send({ message: "Widget not found." });
            }
        });
    })
    .put(function(req, res) {
        Widget.findById(req.params.widget_id, function(err, widget) {
            if (err) res.send(err);
            if (widget) {
                widget.name = req.body.name;

                widget.save(function(err) {
                    if (err) res.send(err);
                    res.json({ message: "Widget updated!" });
                });
            } else {
                res.status(404).send({ message: "Widget not found." });
            }
        });
    })
    .delete(function(req, res) {
        Widget.remove({
            _id: req.params.widget_id
        }, function(err, widget) {
            if (err) res.send(err);
            res.json({ message: "Widget deleted!" });
        });
    });

router.route("/widgets/:widget_id/gizmos")
    .get(function(req, res) {
        Widget.findById(req.params.widget_id, function(err, widget) {
            if (err) res.send(err);
            if (widget) {
                res.json(widget.gizmos);
            } else {
                res.status(404).send({ message: "Widget not found." });
            }
        });
    })
    .post(function(req, res) {
        Widget.findById(req.params.widget_id, function(err, widget) {
            if (err) res.send(err);
            if (widget) {
                widget.gizmos.push({ name: req.body.name });

                widget.save(function(err) {
                    if (err) res.send(err);
                    res.json({ message: "Gizmo created!" });
                });
            } else {
                res.status(404).send({ message: "Widget not found." });
            }
        });

    });

// Register routes
app.use('/api/', router);

// Start server
app.listen(port);
console.log("Listening on port " + port);
