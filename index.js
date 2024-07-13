const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');  // Add this line to import the path module

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

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

app.route('/player/validate/close')
    .get((req, res) => {
        res.send('<script>window.close();</script>');
    })
    .post((req, res) => {
        res.send('<script>window.close();</script>');
    });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'web', 'main.html'));
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});
