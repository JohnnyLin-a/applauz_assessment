const app = require('./app.js');
const config = require('./config');

const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});