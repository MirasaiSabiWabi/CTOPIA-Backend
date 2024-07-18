const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve files from the 'audios' directory (located outside 'public')
app.use('/audios', express.static(path.join(__dirname, 'audios')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());

app.route('/player/login/dashboard')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'html', 'dashboard.html'));
    })
    .post((req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'html', 'dashboard.html'));
    });

app.route('/player/growid/login/validate')
    .get((req, res) => {
        const _token = req.query._token;
        const growId = '';
        const password = '';

        const token = '';

        console.log(`Received: GrowID - ${req.query.growId}`);

        res.send(
            `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
        );
    })
    .post((req, res) => {
        const { _token } = req.body;
        const growId = '';
        const password = '';

        const token = '';

        console.log(`Received: GrowID - ${req.body.growId}`);

        res.send(
            `{"status":"success","message":"Account Validated.","token":"${token}","url":"","accountType":"growtopia"}`,
        );
    });

app.route('/player/validate/close')
    .get((req, res) => {
        res.send('<script>window.close();</script>');
    })
    .post((req, res) => {
        res.send('<script>window.close();</script>');
    });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web', 'dae.html'));
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});
