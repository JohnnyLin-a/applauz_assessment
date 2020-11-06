const express = require('express');
const loaders = require('./loaders');

const startServer = async () => {
    const app = express();


    await loaders({ expressApp: app });

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });

}


startServer();