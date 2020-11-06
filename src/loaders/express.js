const express = require('express');
const cors = require('cors');
const routes = require('../api');
const config = require('../config');

const expressLoader = ({ app }) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.head('/', (req, res) => {
        res.status(200).end();
    });
    app.use(express.json());
    app.use("/api", routes());

    app.enable('trust proxy');
    app.use(cors());
};

module.exports = expressLoader;