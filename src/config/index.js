const dotenv = require('dotenv');
const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

module.exports = {
    api_key: process.env.API_KEY,
    port: process.env.PORT
}