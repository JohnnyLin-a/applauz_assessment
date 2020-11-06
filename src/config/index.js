const dotenv = require('dotenv');
const envFound = dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    api_key: process.env.API_KEY,
    port: process.env.PORT,

    postgres_user: process.env.POSTGRES_USER,
    postgres_password: process.env.POSTGRES_PASSWORD,
    postgres_db: process.env.POSTGRES_DB,
    postgres_host: process.env.POSTGRES_HOST,
    postgres_port: process.env.POSTGRES_PORT,
}