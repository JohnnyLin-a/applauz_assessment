const express = require('express');
const loaders = require('./loaders');
const config = require('./config');

const startServer = async () => {
    const app = express();


    await loaders({ expressApp: app });

    const port = config.port || 3000
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

}


startServer();