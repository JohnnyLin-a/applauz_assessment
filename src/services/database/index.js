const { Pool } = require('pg');
const config = require('../../config');

let pool = new Pool(config.postgres_config);

const getPool = () => {
    return pool;
}

const closePool = async () => {
    if (pool !== null) {
        await pool.end();
        pool = null;
    }
}

const newPool = () => {
    if (pool !== null) {
        pool = new Pool(config.postgres_config);
    }
}

module.exports = {
    getPool,
    closePool,
    newPool,
};