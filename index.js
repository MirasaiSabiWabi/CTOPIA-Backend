const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// Middleware for handling CORS and headers
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

// Serving static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Route for serving dashboard.html on GET and POST to /player/login/dashboard
app.route('/player/login/dashboard')
    .get((req, res) => {
        res.sendFile(__dirname + '/public/html/dashboard.html');
    })
    .post((req, res) => {
        res.sendFile(__dirname + '/public/html/dashboard.html');
    });

// Route for validating login and responding with a token on GET and POST to /player/growid/login/validate
app.route('/player/growid/login/validate')
    .get((req, res) => {
        const _token = req.query._token;
        const growId = req.query.growId;
        const password = req.query.password;

        const token = Buffer.from(
            `_token=${_token}&growId=${growId}&password=${password}`,
        ).toString('base64');

        console.log(`Received: GrowID - ${growId}`);

        res.send(
            `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
        );
    })
    .post((req, res) => {
        const { _token, growId, password } = req.body;

        const token = Buffer.from(
            `_token=${_token}&growId=${growId}&password=${password}`,
        ).toString('base64');

        console.log(`Received: GrowID - ${growId}`);

        res.send(
            `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
        );
    });

// Route for closing the window on GET and POST to /player/validate/close
app.route('/player/validate/close')
    .get((req, res) => {
        res.send('<script>window.close();</script>');
    })
    .post((req, res) => {
        res.send('<script>window.close();</script>');
    });

// Route for serving the main page on GET to /
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Start the server and listen on port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});
