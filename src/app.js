const express = require('express');
const loaders = require('./loaders');
const config = require('./config');
const cors = require('cors');

const app = express();
app.use(cors());

const load = async () => {
    await loaders({ expressApp: app });
}
load();

module.exports = app;