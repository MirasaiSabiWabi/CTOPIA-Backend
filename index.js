const express = require('express');
const app = express();
const path = require('path'); // Added for path resolution
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

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging requests
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Route for serving dashboard.html on POST to /player/login/dashboard
app.post('/player/login/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'dashboard.html'));
});

// Route for validating login and responding with a token
app.post('/player/growid/login/validate', (req, res) => {
    const { _token, growId, password } = req.body;

    const token = Buffer.from(
        `_token=${_token}&growId=${growId}&password=${password}`,
    ).toString('base64');

    res.send(
        `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
    );
});

// Route for closing the window
app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Route for serving main.html from the "web" folder on GET to /
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web', 'main.html'));
});

// Start the server and listen on port 5000
app.listen(5000, function () {
    console.log('Listening on port 5000');
});
