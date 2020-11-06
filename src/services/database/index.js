const { Pool } = require('pg');
const config = require('../../config');

const pool = new Pool(config.postgres_config);

module.exports = { pool };