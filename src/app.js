const express = require('express');
const loaders = require('./loaders');
const config = require('./config');

const app = express();

const load = async () => {
    await loaders({ expressApp: app });
}
load();

module.exports = app;