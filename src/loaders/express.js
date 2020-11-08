const express = require('express');
const path = require('path');
const routes = require('../api');
const config = require('../config');

const expressLoader = async ({ app }) => {
    // app.get('/', (req, res) => {
    //     res.send('Hello World!');
    // });

    app.use(express.static(path.join(__dirname, '../../web-client/build')));
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../../web-client/build', 'index.html'));
    });
    // app.head('/', (req, res) => {
    //     res.status(200).end();
    // });
    app.use(express.json());
    app.use("/api", routes());

    app.enable('trust proxy');
};

module.exports = expressLoader;